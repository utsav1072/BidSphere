import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import axios from "axios";

const Aitemdetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function getItem() {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/api/items/search/?itemid=${id}`);
          setItem(response.data.length > 0 ? response.data[0] : null); 
      } catch (error) {
          console.log(error);
      }
  }
  getItem();
  },[id])

  if (!item) {
    return <p className="text-center text-lg font-semibold text-gray-500">Loading item details...</p>;
  }

  return (
    <div className='flex flex-col md:flex-row bg-white shadow-xl rounded-3xl p-8 m-6 h-120 border border-gray-200'>
      <div className='h-80 w-80 border-2 rounded-3xl overflow-hidden flex items-center justify-center bg-gray-100 shadow-md'>
        <img src={item.image_url} alt={`image-of-item-${id}`} className='h-full w-full object-cover' />
      </div>
      <div className='flex-1 m-4 p-4 flex flex-col justify-between'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl font-bold text-gray-800'>{item.title}</h1>
          <button className='text-blue-500 hover:text-blue-600 font-semibold transition-all flex items-center'>
            <IoMdAdd className="text-xl mr-1"/>Add to Watchlist
          </button>
        </div>
        <div className='mb-6 text-lg text-gray-700'>
          <p className='mb-2'><span className='font-semibold'>Time Left:</span> --</p>
          <p><span className='font-semibold'>Buy Now Price:</span> --</p>
          <p><span className='font-semibold'>Starting Price:</span>{item.starting_price}</p>
        </div>
        <div className='flex justify-between bg-gray-100 p-4 rounded-lg shadow-sm'>
          <div className='text-lg font-semibold text-blue-600'>
            CURRENT BID PRICE - 
          </div>
          <div className='text-lg font-semibold text-blue-600'>
            CURRENT HIGHEST BIDDER - 
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-6 mt-8'>
          <button className='h-12 w-44 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-600 transition-all'>Place Your Bid!</button>
          <span className='text-gray-500 font-semibold text-lg'>Or</span>
          <button className='h-12 w-44 bg-green-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-green-600 transition-all'>Buy Now!</button>
        </div>
      </div>
    </div>
  );
};

export default Aitemdetail;
