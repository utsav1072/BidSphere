import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from '../utils/axiosInstance'

const ItemForBid = () => {
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [userId,setuserId] = useState(null);
  const [cat,setCat] = useState([]);

  async function getcat() {
    const response = await axiosInstance.get("http://127.0.0.1:8000/api/category/");
    setCat(response.data.categories);
    console.log(response.data.categories);
  }

  async function getuserid() {
    const response = await axiosInstance.get("http://127.0.0.1:8000/api/test/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
    });
    setuserId(response.data.userId);
    console.log(userId)
  }

  useEffect(() =>{
    getuserid();
    getcat();
  },[]);

  const [formData, setFormData] = useState({
    item: {
      title: "",
      description: "",
      starting_price: "",
      bid_increment: "",
      category: "",
      start_time: "",
      end_time: "",
      image_url: "",
      status: "active",
      seller: Number(userId)
    },
    auction_status: "ongoing",
    highest_bid: null,
    winner: null,
  });

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
      const response = await axios.post("http://127.0.0.1:8000/api/auctions/create/", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log("Success:", response.data);
      alert("Auction item submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit auction item.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Auction Item Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.item.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Description:</label>
            <textarea
              name="description"
              value={formData.item.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Starting Price:</label>
              <input
                type="number"
                name="starting_price"
                value={formData.item.starting_price}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Bid Increment:</label>
              <input
                type="number"
                name="bid_increment"
                value={formData.item.bid_increment}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Category:</label>
            <select
              name="category"
              value={formData.item.category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {cat?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.category_name}
                </option>
              ))}

            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Start Time:</label>
              <input
                type="datetime-local"
                name="start_time"
                value={formData.item.start_time}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">End Time:</label>
              <input
                type="datetime-local"
                name="end_time"
                value={formData.item.end_time}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Image URL:</label>
            <input
              type="url"
              name="image_url"
              value={formData.item.image_url}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Auction Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForBid;
