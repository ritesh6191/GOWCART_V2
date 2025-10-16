import React from 'react';
import { FaShoppingCart, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-green-700 text-white shadow-inner z-50">
      <div className="flex justify-around items-center py-3">
        
        
        <Link
          to="/buy"
          className="flex flex-col items-center text-white hover:text-gray-200"
        >
          <FaShoppingCart size={24} />
          <span className="text-sm mt-1">BUY</span>
        </Link>

        
        <Link
          to="/sell"
          className="flex flex-col items-center text-white hover:text-gray-200"
        >
          <FaPlusCircle size={24} />
          <span className="text-sm mt-1">SELL</span>
        </Link>
        
      </div>
    </footer>
  );
};

export default Footer;
