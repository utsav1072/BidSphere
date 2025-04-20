import React, { useEffect, useState } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiArrowRight } from 'react-icons/fi';

const Watchlist = () => {
  const navigate = useNavigate();
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [watchlistItems, setWatchlistItems] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axiosInstance.get('/watchlist/', {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });
        setWatchlistItems(response.data.watchlist);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };
    fetchWatchlist();
  }, [authTokens]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-8 py-12 flex flex-col items-center'>
      <div className='max-w-7xl w-full'>
        <div className='text-center mb-12'>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            My Watchlist
          </h1>
          <FiHeart className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <p className="text-gray-600 text-lg">Your curated collection of favorite auctions</p>
        </div>

        <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white'>
          {watchlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {watchlistItems.map((item) => (
                <div 
                  key={item.id} 
                  className='group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-gray-100'
                >
                  <div className='relative overflow-hidden rounded-xl mb-6'>
                    <img 
                      src={`http://127.0.0.1:8000/${item.image_url}`} 
                      alt={item.title}
                      className='w-full h-48 object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105' 
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl' />
                    <span className='absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow'>
                      ₹{item.current_price}
                    </span>
                  </div>

                  <div className='text-center'>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <button 
                      onClick={() => navigate(`/auction/item/${item.id}`)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      View Auction
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='inline-block bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl'>
                <FiHeart className="w-20 h-20 mx-auto text-gray-400 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                  Your Watchlist is Empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Start adding auctions to your watchlist to track them here!
                </p>
                <button
                  onClick={() => navigate('/auctions')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Browse Auctions
                </button>
              </div>
            </div>
          )}   
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
