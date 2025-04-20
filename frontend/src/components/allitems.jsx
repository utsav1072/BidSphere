import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from 'axios';

const Allitems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getallitems() {
      try {
        const response = await axios.get(`https://auctionhub.pythonanywhere.com/api/items/`);
        setItems(response.data.items);
      } catch (error) {
        console.log(error);
      }
    }
    getallitems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-2">
      {/* Header with Back Button and Title */}
      <div className="relative flex items-center justify-center w-full mb-8">
        <button
          className="absolute left-0 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg font-semibold transition"
          onClick={() => navigate(`/`)}
        >
          <AiOutlineArrowLeft className="text-xl"/>
          Back
        </button>
        <h1 className="w-full text-4xl font-extrabold text-center bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent drop-shadow">
          All Auction Items
        </h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white/90 shadow-xl rounded-2xl p-6 border border-blue-100 flex flex-col items-center transition-all hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="relative w-full h-56 mb-4 rounded-xl overflow-hidden">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs text-blue-700 font-semibold shadow">
                ₹{item.current_price}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{item.title}</h2>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
            <button
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 shadow transition-all"
              onClick={() => navigate(`/auction/item/${item.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allitems;
