import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CowImg from "../assests/Buy/cowBuy.png";

const CowFilterPage = () => {
  const [filteredCows, setFilteredCows] = useState([]);
  const [breeds, setBreeds] = useState([
    "Krishna Valley",
    "Red Kandhari",
    "Nagpuri",
    "Gir",
    "Sahiwal"
  ]);
  const [filters, setFilters] = useState({
    breed: "",
    price: [0, 100000],
    milkCapacity: [0, 20]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRangeChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchFilteredCows = async () => {
    try {
      const res = await axios.post("/filter/cows", filters);
      setFilteredCows(res.data);
    } catch (err) {
      console.error("Error fetching filtered cows:", err);
    }
  };

  useEffect(() => {
    fetchFilteredCows();
  }, [filters]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700 text-center">
        🐄 Filter Cows for Sale
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium text-green-700">Breed</label>
            <select
              name="breed"
              value={filters.breed}
              onChange={handleChange}
              className="w-full border border-green-400 rounded px-3 py-2"
            >
              <option value="">All Breeds</option>
              {breeds.map((b, i) => (
                <option key={i} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-green-700">Price Range (₹)</label>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={filters.price[1]}
              onChange={(e) => handleRangeChange("price", [0, parseInt(e.target.value)])}
              className="w-full"
            />
            <p className="text-sm mt-1 text-gray-600">Up to ₹{filters.price[1]}</p>
          </div>

          <div>
            <label className="block mb-1 font-medium text-green-700">Milk Capacity (Litres)</label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={filters.milkCapacity[1]}
              onChange={(e) => handleRangeChange("milkCapacity", [0, parseInt(e.target.value)])}
              className="w-full"
            />
            <p className="text-sm mt-1 text-gray-600">Up to {filters.milkCapacity[1]} Litres</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCows.map((cow) => (
          <div
            key={cow._id}
            className="bg-white border border-green-600 rounded-xl shadow hover:shadow-lg transition p-3"
          >
            <Link to={`/animal/cow/${cow._id}`}>
              <img
                src={cow.CowImage1}
                alt={cow.Breed}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="font-bold text-lg text-green-700">{cow.Breed}</h2>
              <p className="text-sm text-gray-700">Milk Capacity: {cow.MilkCapacity} L</p>
              <p className="text-sm text-gray-700">Age: {cow.Age} yrs</p>
              <p className="text-sm text-gray-700">Price: ₹{cow.Price}</p>
              <p className="text-sm text-gray-600 mt-1">📍 {cow.Address}</p>
            </Link>
          </div>
        ))}
      </div>

      {filteredCows.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No cows found with these filters.</p>
      )}
    </div>
  );
};

export default CowFilterPage;
