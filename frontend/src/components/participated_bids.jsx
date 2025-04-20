import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { FiTrendingUp, FiArrowRight } from "react-icons/fi";

const Participated_bids = () => {
  const [items, setItems] = useState([]);
  const authTokens = useSelector((state) => state.auth.authTokens);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllItems() {
      try {
        const response = await axiosInstance.get(`user/bids/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });
        setItems(response.data.bids);
      } catch (error) {
        console.log(error);
      }
    }
    getAllItems();
  }, [authTokens]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 via-white/80 to-purple-100/60 py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-10 text-center flex items-center gap-3">
        <FiTrendingUp className="text-indigo-600 text-4xl" />
        Participated Bids
      </h1>
      <div className="w-full max-w-7xl">
        {items.length > 0 ? (
          <div className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth snap-x snap-mandatory w-full pb-4">
            {items.map((itemWrapper) => {
              const item = itemWrapper.item;
              return (
                <div
                  key={item.id}
                  className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-blue-100 min-w-[320px] max-w-xs flex-shrink-0 snap-center flex flex-col"
                >
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                    <img
                      src={`https://auctionhub.pythonanywhere.com/${item.image_url}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-xl"
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
                      <FiArrowRight className="text-lg" />
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block bg-gradient-to-br from-blue-50 to-purple-50 p-10 rounded-3xl shadow-lg">
              <FiTrendingUp className="w-20 h-20 mx-auto text-indigo-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                No Participated Bids Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start bidding on auctions and your participated items will appear here!
              </p>
              <button
                onClick={() => navigate('/auction/all-items')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Browse Auctions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participated_bids;
