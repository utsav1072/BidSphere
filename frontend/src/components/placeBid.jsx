import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";

const PlaceBid = ({ itemId }) => {
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/api/bids/create/",
        { item: itemId, bid_amount: parseFloat(bidAmount) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      setMessage("Bid placed successfully!");
      setBidAmount("");
    } catch (err) {
      setError("Failed to place bid. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Place Your Bid
      </h2>

      {message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-center">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Bid Amount</label>
          <input
            type="number"
            name="bid_amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            step="0.01"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Placing Bid..." : "Submit Bid"}
        </button>
      </form>
    </div>
  );
};

export default PlaceBid;
