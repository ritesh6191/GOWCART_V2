import React from 'react';
import { useNavigate } from 'react-router-dom';
import cowImg from '../assests/Sell/cow.png';
import buffaloImg from '../assests/Sell/buffalo.png';
import goatImg from '../assests/Sell/goat.png';
import horseImg from '../assests/Sell/horse.png';

const animals = [
  { name: 'Cow', image: cowImg },
  { name: 'Buffalo', image: buffaloImg },
  { name: 'Goat', image: goatImg },
  { name: 'Horse', image: horseImg }
];

const SellPage = () => {
  const navigate = useNavigate();

  const handleSelect = (animal) => {
    navigate(`/sell/${animal.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Select Animal to Sell</h1>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {animals.map((animal) => (
          <div
            key={animal.name}
            onClick={() => handleSelect(animal.name)}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center hover:bg-green-100 cursor-pointer transition"
          >
            <img src={animal.image} alt={animal.name} className="h-20 w-20 object-contain mb-2" />
            <span className="text-lg font-medium">{animal.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellPage;
