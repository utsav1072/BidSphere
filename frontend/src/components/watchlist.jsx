import React, { useEffect, useState } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const navigate = useNavigate();

  const authTokens = useSelector((state) => state.auth.authTokens);
  const [watchlistItems, setWatchlistItems] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axiosInstance.get('/watchlist/', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });

        console.log("API Response:", response.data); // Debugging
        setWatchlistItems(response.data.watchlist);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [authTokens]);

  return (
    <div className='h-auto p-8 bg-gray-100 min-h-screen flex flex-col items-center'>
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">My Watchlist</h1>
      <div className='w-full max-w-6xl border border-gray-300 p-8 bg-white shadow-xl rounded-lg'>
        {watchlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-6">
            {watchlistItems.map((item) => (
              <div 
                key={item.id} 
                className='border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center'
              >
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-60 h-60 object-cover rounded-lg mb-4 border"
                />
                <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <p className="text-lg font-bold text-green-600">Price: ₹{item.current_price}</p>
                <button 
                  onClick={() => navigate(`/auction/item/${item.id}`)} 
                  className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No items in watchlist</p>
        )}   
      </div>
    </div>
  );
};

export default Watchlist;