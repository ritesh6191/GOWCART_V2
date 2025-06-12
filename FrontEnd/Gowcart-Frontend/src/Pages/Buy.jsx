import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import nearbyPng from "../assests/nearby-logo.png";
import CowImg from "../assests/Buy/cowBuy.png";
import BuffImg from "../assests/Buy/buffBuy.png";
import GoatImg from "../assests/Buy/goatBuy.png";
import HorseImg from "../assests/Buy/horseBuy.png";

const BuyPage = () => {
  const [animals, setAnimals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isNearbyMode, setIsNearbyMode] = useState(false);
  const observer = useRef();

  const navigate = useNavigate();

  const getBadgeColor = (type) => {
    switch (type) {
      case "Cow":
        return "bg-green-600";
      case "Buffalo":
        return "bg-blue-600";
      case "Goat":
        return "bg-purple-600";
      case "Horse":
        return "bg-yellow-600 text-black";
      default:
        return "bg-gray-600";
    }
  };

  const ImageSlider = ({ image1, image2 }) => {
    const [current, setCurrent] = useState(0);
    const images = [image1, image2].filter(Boolean);

    useEffect(() => {
      if (images.length < 2) return;
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <div className="w-full h-40 sm:h-48 md:h-52 lg:h-56 overflow-hidden relative rounded-t-2xl">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`animal-img-${idx}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 rounded-t-2xl ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    );
  };

  const lastAnimalRef = useCallback(
    (node) => {
      if (loading || isNearbyMode) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, isNearbyMode]
  );

  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/get/allAnimals?page=${page}`);
      if (res.data.data.length === 0) {
        setHasMore(false);
      } else {
        setAnimals((prev) => [...prev, ...res.data.data]);
      }
    } catch (err) {
      console.error("Failed to load animals", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyAnimals = async () => {
    setLoading(true);
    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
    
      const { latitude, longitude } = position.coords;
    
      // Validate coordinates
      if (
        typeof latitude !== "number" ||
        typeof longitude !== "number" ||
        isNaN(latitude) ||
        isNaN(longitude)
      ) {
        console.error("Invalid coordinates:", latitude, longitude);
        setLoading(false);
        return;
      }
    
      const res = await axios.post("/get/nearbyAnimals", {
        latitude,
        longitude,
        maxDistance: 100000, // 100 km in meters
      });
    
      setAnimals(res.data.data);
      setHasMore(false);
      setIsNearbyMode(true);
    } catch (err) {
      console.error("Failed to fetch nearby animals", err);
    } finally {
      setLoading(false);
    }
  };
  
  

  const resetToAllAnimals = async () => {
    setIsNearbyMode(false);
    setPage(1);
    setAnimals([]);
    setHasMore(true);
  };

  useEffect(() => {
    if (!isNearbyMode) {
      fetchAnimals();
    }
  }, [page, isNearbyMode]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {[
            { label: "Cow", img: CowImg },
            { label: "Buffalo", img: BuffImg },
            { label: "Goat", img: GoatImg },
            { label: "Horse", img: HorseImg },
          ].map((animal) => (
            <button
              key={animal.label}
              onClick={() => navigate(`/buy/${animal.label.toLowerCase()}`)}
              className="flex flex-col items-center w-20 hover:scale-105 transition-transform"
            >
             <img
                src={animal.img}
                alt={animal.label}
                className="w-16 h-16 object-cover mb-1 rounded-full border border-green-600 overflow-hidden"
              />
              <span className="text-xs font-semibold text-green-700">{animal.label}</span>
            </button>
          ))}
        </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {animals.map((animal, idx) => {
          const image1 =
            animal.CowImage1 ||
            animal.BuffImage1 ||
            animal.GoatImage1 ||
            animal.HorseImage1;

          const image2 =
            animal.CowImage2 ||
            animal.BuffImage2 ||
            animal.GoatImage2 ||
            animal.HorseImage2;

          if (!image1) return null;

          return (
            <div
              key={animal._id}
              ref={idx === animals.length - 1 && !isNearbyMode ? lastAnimalRef : null}
              className="bg-white rounded-2xl border border-green-600 shadow-lg hover:shadow-xl transition-transform duration-300 flex flex-col"
            >
              <Link
                to={`/animal/${animal.modelType?.toLowerCase()}/${animal._id}`}
              >
                <ImageSlider image1={image1} image2={image2} />

                <div className="flex flex-col justify-between flex-grow p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs text-white px-2 py-1 rounded-full font-medium tracking-wide ${getBadgeColor(
                        animal.modelType
                      )}`}
                    >
                      {animal.modelType}
                    </span>
                    <p className="text-lg font-extrabold font-mono text-green-700">
                      ₹{animal.Price}
                    </p>
                  </div>

                  <div className="text-sm space-y-1 text-gray-700 font-[500]">
                    <p>
                      <span className="font-semibold">Breed:</span>{" "}
                      {animal.Breed}
                    </p>
                    {animal.Address && <p>📍 {animal.Address}</p>}
                    <p>
                      👤{" "}
                      {animal.Owner
                        ? `${animal.Owner.firstName || ""} ${
                            animal.Owner.lastName || ""
                          }`.trim()
                        : "Owner"}
                    </p>
                  </div>
                </div>
              </Link>

              <a
                href={`tel:${animal.Owner?.phone || ""}`}
                className="m-4 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl text-center transition"
              >
                📞 Call Seller
              </a>
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="text-center mt-4 text-green-600 font-semibold">
          Loading...
        </p>
      )}
      {!hasMore && animals.length > 0 && (
        <p className="text-center mt-4 text-gray-500">No more animals.</p>
      )}

      {/* Back to All Animals */}
      {isNearbyMode && (
        <div className="text-center mt-6">
          <button
            onClick={resetToAllAnimals}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            🔄 Back to All Animals
          </button>
        </div>
      )}

      {/* Fixed Nearby Button */}
      <button
        className="fixed bottom-20 right-5 rounded-full p-0 shadow-lg z-50 w-16 h-16 bg-transparent border-none"
        title="Show Nearby Animals"
        onClick={fetchNearbyAnimals}
      >
        <img
          src={nearbyPng}
          alt="Nearby Animals"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </button>

    </div>
  );
};

export default BuyPage;
