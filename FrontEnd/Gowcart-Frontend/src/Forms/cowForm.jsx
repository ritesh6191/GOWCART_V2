import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import cowLoadingImg from '../assests/Loading/cow-loading.png'

const CowFormPage = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Watch file inputs for image previews
  const cowImage1 = watch('CowImage1');
  const cowImage2 = watch('CowImage2');

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
      formData.append('CowImage1', data.CowImage1[0]);
      formData.append('CowImage2', data.CowImage2[0]);

      // Append location with coordinates as [longitude, latitude]
      formData.append('location[coordinates][]', location.lng);
      formData.append('location[coordinates][]', location.lat);

      // Post to your sell route
      await axios.post('/sell/cow', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      toast.success("Cow listed successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to list cow");
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <>
  {isSubmitting && (
  <div className="fixed inset-0 z-50 bg-white/90 flex flex-col items-center justify-center">
    <img src={cowLoadingImg} alt="Loading" className="h-32 w-32 animate-bounce" />
    <p className="mt-4 text-lg font-semibold text-green-700">Loading...</p>
  </div>
  )}


    <div className="max-w-md mx-auto mt-6 mb-32 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Sell Your Cow
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div>
  <label className="block text-sm font-medium mb-1">Breed</label>
  <select
    {...register("Breed", { required: "Breed is required" })}
    className="w-full border border-gray-300 rounded-xl px-3 py-2"
  >
    <option value="">Select Breed</option>
    <option value="Sahiwal cattle">Sahiwal cattle</option>
    <option value="Murrah buffalo">Murrah buffalo</option>
    <option value="Nagpuri">Nagpuri</option>
    <option value="Red Kandhari">Red Kandhari</option>
    <option value="Gaolao">Gaolao</option>
    <option value="Nimari cattle">Nimari cattle</option>
    <option value="Dangi">Dangi</option>
    <option value="Sahiwal">Sahiwal</option>
    <option value="Rathi">Rathi</option>
    <option value="Malvi">Malvi</option>
    <option value="Krishna Valley">Krishna Valley</option>
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
            label="Cow Image 1"
            name="CowImage1"
            register={register}
            preview={cowImage1?.[0] ? URL.createObjectURL(cowImage1[0]) : null}
            onRemove={() => setValue('CowImage1', null)}
          />

          <FileInput
            label="Cow Image 2"
            name="CowImage2"
            register={register}
            preview={cowImage2?.[0] ? URL.createObjectURL(cowImage2[0]) : null}
            onRemove={() => setValue('CowImage2', null)}
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

export default CowFormPage;
