import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from "react-router-dom";

const ItemForBid = () => {
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [userId, setuserId] = useState(null);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();

  async function getcat() {
    const response = await axios.get("http://127.0.0.1:8000/api/category/");
    setCat(response.data.categories);
  }

  async function getuserid() {
    const response = await axiosInstance.get("http://127.0.0.1:8000/api/test/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
    });
    setuserId(response.data.data.id);
    // console.log(response.data.data.id)
  }

  useEffect(() => {
    getuserid();
    getcat();
    // eslint-disable-next-line
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
  };

  const getEndDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 24); // Add 24 hours
    return now.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    item: {
      title: "",
      description: "",
      starting_price: "",
      bid_increment: "",
      category: "",
      start_time: getCurrentDateTime(),
      end_time: getEndDateTime(),
      status: "active",
      seller: Number(userId),
      image_url:null
    },
    auction_status: "ongoing",
    highest_bid: null,
    winner: null,
  });

  // Update seller in formData when userId changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      item: {
        ...prevData.item,
        seller: Number(userId),
      },
    }));
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      item: {
        ...prevData.item,
        [name]: value,
        seller: Number(userId),
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("http://127.0.0.1:8000/api/auctions/create/", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      // console.log("Success:", response.data);
      alert("Auction item submitted successfully!");
      navigate(`/auction/item/${response.data.id}`)
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit auction item.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 pb-4 border-b-2 border-blue-100">
          Create New Auction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Item Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.item.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Enter item title"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.item.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Describe your item in detail..."
            ></textarea>
          </div>

          {/* Price & Increment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Starting Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                <input
                  type="number"
                  name="starting_price"
                  value={formData.item.starting_price}
                  onChange={handleChange}
                  step="0.01"
                  required
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Bid Increment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                <input
                  type="number"
                  name="bid_increment"
                  value={formData.item.bid_increment}
                  onChange={handleChange}
                  step="0.01"
                  required
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.item.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyOGQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDEwIDUgNSA1LTVaIi8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.5rem] cursor-pointer"
            >
              <option value="">Select Category</option>
              {cat?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Item Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl transition cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  <svg 
                    className="w-8 h-8 text-gray-400 mb-2" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 20 16"
                  >
                    <path 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L7 9m3-3 3 3"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 text-center">
                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.item.image_url?.name || "No file chosen"}
                  </p>
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      item: {
                        ...prev.item,
                        image_url: e.target.files[0],
                      }
                    }));
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Create Auction Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForBid;