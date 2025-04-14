import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import buffLoadingImg from '../assests/Loading/buffalow-loading.png';

const BuffaloFormPage = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Watch file inputs for image previews
  const buffImage1 = watch('BuffImage1');
  const buffImage2 = watch('BuffImage2');

  useEffect(() => {
    // Get user geolocation for location field
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => toast.warn("Could not fetch location")
    );
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Append data ensuring numerical values are cast to numbers
      formData.append('Breed', data.Breed);
      formData.append('Age', Number(data.Age));
      formData.append('CalvinCount', Number(data.CalvinCount));
      formData.append('MilkCapacity', Number(data.MilkCapacity));
      formData.append('Address', data.Address);
      formData.append('Price', Number(data.Price));

      // Append images (files)
      formData.append('BuffImage1', data.BuffImage1[0]);
      formData.append('BuffImage2', data.BuffImage2[0]);

      // Append location with coordinates as [longitude, latitude]
      formData.append('location[coordinates][]', location.lng);
      formData.append('location[coordinates][]', location.lat);

      // Post to your sell route
      await axios.post('/sell/buffallo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      toast.success("Buffalo listed successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to list buffalo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-white/90 flex flex-col items-center justify-center">
          <img src={buffLoadingImg} alt="Loading" className="h-32 w-32 animate-bounce" />
          <p className="mt-4 text-lg font-semibold text-green-700">Loading...</p>
        </div>
      )}

      <div className="max-w-md mx-auto mt-6 mb-32 px-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Sell Your Buffalo
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-1">Breed</label>
              <select
                {...register("Breed", { required: "Breed is required" })}
                className="w-full border border-gray-300 rounded-xl px-3 py-2"
              >
                <option value="">Select Breed</option>
                <option value="Murrah buffalo">Murrah buffalo</option>
                <option value="Banni buffalo">Banni buffalo</option>
                <option value="Surti buffalo">Surti buffalo</option>
                <option value="Mehsana buffalo">Mehsana buffalo</option>
                <option value="Jaffrabadi buffalo">Jaffrabadi buffalo</option>
              </select>
              {errors.Breed && <p className="text-red-500 text-sm">{errors.Breed.message}</p>}
            </div>

            <Input 
              label="Age" 
              name="Age" 
              register={register} 
              errors={errors} 
              type="number"
            />

            <Input 
              label="Calving Count" 
              name="CalvinCount" 
              register={register} 
              errors={errors} 
              type="number"
            />

            <Input 
              label="Milk Capacity (L/day)" 
              name="MilkCapacity" 
              register={register} 
              errors={errors} 
              type="number"
            />

            <Input 
              label="Address" 
              name="Address" 
              register={register} 
              errors={errors} 
              type="text"
            />

            <Input 
              label="Price (₹)" 
              name="Price" 
              register={register} 
              errors={errors} 
              type="number"
            />

            <FileInput
              label="Buffalo Image 1"
              name="BuffImage1"
              register={register}
              preview={buffImage1?.[0] ? URL.createObjectURL(buffImage1[0]) : null}
              onRemove={() => setValue('BuffImage1', null)}
            />

            <FileInput
              label="Buffalo Image 2"
              name="BuffImage2"
              register={register}
              preview={buffImage2?.[0] ? URL.createObjectURL(buffImage2[0]) : null}
              onRemove={() => setValue('BuffImage2', null)}
            />

            <button type="submit" disabled={isSubmitting} 
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

const Input = ({ label, name, register, errors, type }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      {...register(name, { required: `${label} is required` })}
      className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none rounded-xl px-4 py-2 text-sm shadow-sm"
    />
    {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
  </div>
);

const FileInput = ({ label, name, register, preview, onRemove }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="file"
      accept="image/*"
      {...register(name, { required: `${label} is required` })}
      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
    />
    {preview && (
      <div className="mt-2 relative">
        <img
          src={preview}
          alt={`${label} Preview`}
          className="rounded-xl w-full h-48 object-cover border"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 bg-white text-red-500 border border-red-500 rounded-full px-2 py-1 text-xs hover:bg-red-100"
        >
          Remove
        </button>
      </div>
    )}
  </div>
);

export default BuffaloFormPage;
