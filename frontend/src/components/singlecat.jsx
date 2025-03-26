import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Singlecat = () => {
  const navigate = useNavigate();
  const {cat} = useParams();
  const [category,setCategory] = useState([]);
  useEffect(() =>{
    async function getitemofcategory() {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/api/items/search/?category=${cat}`);
          setCategory(response.data); 
      } catch (error) {
          console.log(error);
      }
  }
  getitemofcategory();
  },[cat])


  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mb-6">{cat}</h1>
    
    {/* Grid Container - 3 items per row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {category.map((item) => (
        <div key={item.id} className="bg-white shadow-lg rounded-xl p-4 border">
          <img 
            src={item.image_url} 
            alt={item.title} 
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-blue-600 font-bold mt-2">Price: ₹{item.current_price}</p>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all" onClick={() => navigate(`/auction/item/${item.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default Singlecat
