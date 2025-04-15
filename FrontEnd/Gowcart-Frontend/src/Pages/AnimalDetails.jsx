import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

const AnimalDetail = () => {
  const { type, id } = useParams();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await axios.get(`/get/animal/${type}/${id}`);
        setAnimal(res.data.data);
      } catch (err) {
        console.error("Error fetching animal:", err);
      }
    };

    fetchAnimal();
  }, [type, id]);

  if (!animal) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  const images = [
    animal.CowImage1,
    animal.CowImage2,
    animal.BuffaloImage1,
    animal.BuffaloImage2,
    animal.GoatImage1,
    animal.GoatImage2,
    animal.HorseImage1,
    animal.HorseImage2,
  ].filter(Boolean);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Prepare display info dynamically
  const fieldsToDisplay = Object.entries(animal)
    .filter(
      ([key, value]) =>
        ![
          "_id",
          "__v",
          "createdAt",
          "updatedAt",
          "CowImage1",
          "CowImage2",
          "BuffaloImage1",
          "BuffaloImage2",
          "GoatImage1",
          "GoatImage2",
          "HorseImage1",
          "HorseImage2",
          "Owner",
          "modelType",
          "location",
        ].includes(key) && value !== null && value !== ""
    )
    .map(([key, value]) => ({
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      value,
    }));

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-20">
      {/* Image Slider */}
      <div className="bg-white">
        <Slider {...sliderSettings}>
          {images.map((img, idx) => (
            <div key={idx} className="h-64 sm:h-80 flex items-center justify-center border-b">
              <img
                src={img}
                alt={`Animal ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Info Card */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl shadow-lg p-4 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-green-700">
              {animal.Breed} ({animal.modelType})
            </h2>
            <p className="text-lg sm:text-xl font-bold text-gray-800 mt-1">
              ₹{animal.Price}
            </p>
          </div>

          {/* Dynamic Details */}
          <div className="text-sm sm:text-base text-gray-700 space-y-3">
            {fieldsToDisplay.map((field, idx) => (
              <p key={idx}>
                <strong>{field.label}:</strong> {field.value}
              </p>
            ))}
            {animal.Address && (
              <p>
                <strong>Location:</strong> {animal.Address}
              </p>
            )}
          </div>

          {/* Seller Info */}
          <div className="border-t pt-2 text-sm text-gray-600 space-y-2">
            <p>
              <strong>Seller:</strong> {animal.Owner?.firstName} {animal.Owner?.lastName}
            </p>
            <p>
              <strong>Phone:</strong> {animal.Owner?.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="px-4 py-4">
        <div className="flex justify-between gap-4">
          <a
            href={`tel:${animal.Owner?.phone}`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
          >
            📞 Call Seller
          </a>
          <a
            href={`https://wa.me/${animal.Owner?.phone}?text=Hello%20I'm%20interested%20in%20the%20${animal.Breed}%20listed%20on%20your%20GOWCART%20profile.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
          >
            💬 WhatsApp Seller
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
