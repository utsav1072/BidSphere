import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEye } from "react-icons/fi";

const Useraucsummary = () => {
  const [items, setItems] = useState([]);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllItems() {
      try {
        const response = await axios.get(`https://auctionhub.pythonanywhere.com/api/items/search/?seller=${user.user_id}`);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (user?.user_id) getAllItems();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 via-white/80 to-purple-100/60 py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-10 text-center">
        Your Auctioned Items
      </h1>
      <div className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth snap-x snap-mandatory w-full max-w-7xl pb-4">
        {items.length === 0 ? (
          <div className="text-xl text-blue-700 font-semibold mx-auto mt-12">
            No items found.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-blue-100 min-w-[320px] max-w-xs flex-shrink-0 snap-center flex flex-col"
            >
              <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                <img
                  src={`https://auctionhub.pythonanywhere.com/${item.image_url}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h2 className="text-lg font-bold text-blue-900 mb-1 line-clamp-1">{item.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-blue-700 font-bold text-lg">₹{item.current_price}</span>
                <button
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                  onClick={() => navigate(`/auction/item/${item.id}`)}
                >
                  <FiEye className="text-lg" />
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Useraucsummary;
