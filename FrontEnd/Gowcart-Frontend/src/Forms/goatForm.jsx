import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import goatLoadingImg from '../assests/Loading/goat-loading.png'; // You can use a goat loader image or reuse cowLoadingImg

const GoatFormPage = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goatImage1 = watch('GoatImage1');
  const goatImage2 = watch('GoatImage2');

  useEffect(() => {
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

      formData.append('Breed', data.Breed);
      formData.append('Age', Number(data.Age));
      formData.append('Weight', Number(data.Weight));
      formData.append('Address', data.Address);
      formData.append('Price', Number(data.Price));

      formData.append('GoatImage1', data.GoatImage1[0]);
      formData.append('GoatImage2', data.GoatImage2[0]);

      formData.append('location[coordinates][]', location.lng);
      formData.append('location[coordinates][]', location.lat);

      await axios.post('/sell/goat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      toast.success("Goat listed successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to list goat");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-white/90 flex flex-col items-center justify-center">
          <img src={goatLoadingImg} alt="Loading" className="h-32 w-32 animate-bounce" />
          <p className="mt-4 text-lg font-semibold text-green-700">Uploading Goat...</p>
        </div>
      )}

      <div className="max-w-md mx-auto mt-6 mb-32 px-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Sell Your Goat
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <Input 
              label="Breed" 
              name="Breed" 
              register={register} 
              errors={errors} 
              type="text"
            />

            <Input 
              label="Age" 
              name="Age" 
              register={register} 
              errors={errors} 
              type="number"
            />

            <Input 
              label="Weight (kg)" 
              name="Weight" 
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
              label="Goat Image 1"
              name="GoatImage1"
              register={register}
              preview={goatImage1?.[0] ? URL.createObjectURL(goatImage1[0]) : null}
              onRemove={() => setValue('GoatImage1', null)}
            />

            <FileInput
              label="Goat Image 2"
              name="GoatImage2"
              register={register}
              preview={goatImage2?.[0] ? URL.createObjectURL(goatImage2[0]) : null}
              onRemove={() => setValue('GoatImage2', null)}
            />

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
            >
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

export default GoatFormPage;
