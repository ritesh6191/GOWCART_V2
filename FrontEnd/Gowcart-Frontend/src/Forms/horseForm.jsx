import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import horseLoadingImg from '../assests/Loading/horse-loading.png';

const HorseFormPage = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const horseImage1 = watch('HorseImage1');
  const horseImage2 = watch('HorseImage2');

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
      formData.append('Height', Number(data.Height));
      formData.append('Health', data.Health);
      formData.append('Description', data.Description);
      formData.append('Address', data.Address);
      formData.append('Price', Number(data.Price));

      formData.append('HorseImage1', data.HorseImage1[0]);
      formData.append('HorseImage2', data.HorseImage2[0]);

      formData.append('longitude', location.lng);
      formData.append('latitude', location.lat);


      await axios.post('/sell/horse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      toast.success("Horse listed successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to list horse");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-white/90 flex flex-col items-center justify-center">
          <img src={horseLoadingImg} alt="Loading" className="h-32 w-32 animate-bounce" />
          <p className="mt-4 text-lg font-semibold text-green-700">Loading...</p>
        </div>
      )}

      <div className="max-w-md mx-auto mt-6 mb-32 px-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Sell Your Horse
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <select
                {...register("Breed", { required: "Breed is required" })}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none rounded-xl px-4 py-2 text-sm shadow-sm"
                defaultValue="">
                <option value="" disabled>Select breed</option>
                <option value="Marwari">Marwari</option>
                <option value="Kathiawari">Kathiawari</option>
                <option value="Manipuri">Manipuri</option>
                <option value="Bhutia">Bhutia</option>
                <option value="Zanskari">Zanskari</option>
                <option value="Sindhi">Sindhi</option>
            </select>
            {errors.Breed && <p className="text-red-500 text-sm mt-1">{errors.Breed.message}</p>}
            </div>
            <Input label="Age" name="Age" register={register} errors={errors} type="number" />
            <Input label="Weight (kg)" name="Weight" register={register} errors={errors} type="number" />
            <Input label="Height (inches)" name="Height" register={register} errors={errors} type="number" />
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
            <select
                {...register("Health", { required: "Health status is required" })}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none rounded-xl px-4 py-2 text-sm shadow-sm"
                defaultValue=""
            >
                <option value="" disabled>Select health status</option>
                <option value="Full Healthy">Full Healthy</option>
                <option value="Moderate">Moderate</option>
                <option value="Injured">Injured</option>
            </select>
            {errors.Health && <p className="text-red-500 text-sm mt-1">{errors.Health.message}</p>}
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
                {...register("Description", { required: "Description is required" })}
                rows={4}
                placeholder="Describe the horse (behavior, habits, etc.)"
                className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none rounded-xl px-4 py-2 text-sm shadow-sm resize-none"
            ></textarea>
            {errors.Description && (
                <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>
            )}
            </div>
            <Input label="Address" name="Address" register={register} errors={errors} type="text" />
            <Input label="Price (₹)" name="Price" register={register} errors={errors} type="number" />

            <FileInput
              label="Horse Image 1"
              name="HorseImage1"
              register={register}
              preview={horseImage1?.[0] ? URL.createObjectURL(horseImage1[0]) : null}
              onRemove={() => setValue('HorseImage1', null)}
            />

            <FileInput
              label="Horse Image 2"
              name="HorseImage2"
              register={register}
              preview={horseImage2?.[0] ? URL.createObjectURL(horseImage2[0]) : null}
              onRemove={() => setValue('HorseImage2', null)}
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

export default HorseFormPage;
