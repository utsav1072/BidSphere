import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    getAllItems();

  }, [user]);

  return (
    <div>
      <div className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth snap-x snap-mandatory w-full">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-xl p-4 border min-w-[25%] md:min-w-[30%] lg:min-w-[22%] snap-center">
            <img 
              src={item.image_url} 
              alt={item.title} 
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-blue-600 font-bold mt-2">Price: ₹{item.current_price}</p>
            <button 
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all" 
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

export default Useraucsummary;
