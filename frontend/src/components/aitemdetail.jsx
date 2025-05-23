import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import AuctionRelativeTimer from "./time-counter";
import Swal from "sweetalert2";

const Aitemdetail = () => {
  const user = useSelector(state => state.auth.user);
  const winner = useSelector(state => state.winner.winner);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [highestBidId, setHighestBidId] = useState(null);
  const [highestBidder, setHighestBidder] = useState("");
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  async function handlewatchlist() {
    await axiosInstance.post('add/to/watchlist/',
      { item_id: id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
      }
    );
    Swal.fire({
      title: "Added!",
      text: "Item added to your watchlist.",
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });
  }

  async function handleBid() {
    try {
      await axiosInstance.post(
        "/create-bid/",
        {
          item: item.id,
          bid_amount: bidAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      setToggle(!toggle);
      Swal.fire({
        title: "Success!",
        text: "Your bid has been placed successfully!",
        icon: "success",
        confirmButtonText: "OK"
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to place bid. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }

  useEffect(() => {
    async function getItem() {
      try {
        const response = await axios.get(`https://auctionhub.pythonanywhere.com/api/items/search/?itemid=${id}`);
        setItem(response.data.length > 0 ? response.data[0] : null);
      } catch (error) {
        console.log(error);
      }
    }
    getItem();
  }, [id, toggle]);

  useEffect(() => {
    async function getHighestBid() {
      try {
        const response = await axios.get(`https://auctionhub.pythonanywhere.com/api/auction/search/?q=${id}`);
        if (response.data.length > 0) {
          setHighestBidId(response.data[0].highest_bid);
        }
      } catch (error) {
        // silent
      }
    }
    getHighestBid();
  }, [id, toggle, user]);

  useEffect(() => {
    if (highestBidId) {
      async function getHighestBidder() {
        try {
          const response = await axios.get(`https://auctionhub.pythonanywhere.com/api/bids/${highestBidId}/`);
          const userRes = await axios.get(`https://auctionhub.pythonanywhere.com/api/user/?q=${response.data.bidder}`);
          setHighestBidder(userRes.data[0].username);
        } catch (error) {
          // silent
        }
      }
      getHighestBidder();
    }
  }, [highestBidId, toggle]);

  function handleinc() {
    setBidAmount((prev) =>
      (prev ? Number(prev) : Number(item.current_price)) + Number(item.bid_increment)
    );
  }

  function handledec() {
    setBidAmount((prev) => {
      const newBid = (prev ? Number(prev) : Number(item.current_price)) - Number(item.bid_increment);
      return newBid >= item.current_price ? newBid : item.current_price;
    });
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-center text-lg font-semibold text-gray-500">
          Loading item details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 via-white/80 to-purple-100/60 py-12 px-4">
      {/* Back Button */}
      <button
        type="button"
        className="mb-8 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg font-semibold transition"
        onClick={() => navigate(`/`)}
      >
        ← Back
      </button>

      {/* Glassmorphic Card */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100 p-8 transition-shadow duration-300">
        {/* Image Section */}
        <div className="flex-shrink-0 h-80 w-80 border-2 border-blue-100 rounded-3xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg">
          <img
            src={`https://auctionhub.pythonanywhere.com/${item.image_url}`}
            alt={`image-of-item-${id}`}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Title & Watchlist */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2 md:mb-0">{item.title}</h1>
            <button
              className="flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold shadow hover:bg-blue-200 transition"
              onClick={handlewatchlist}
            >
              <IoMdAdd className="text-2xl" />
              Add to Watchlist
            </button>
          </div>

          {/* Timer & Price */}
          <div className="mb-6 text-lg text-gray-700 space-y-2">
            <div>
              <span className="font-semibold text-blue-700">Time Left:</span>{" "}
              <span className="inline-block px-2 py-1 rounded bg-blue-50 text-blue-800 font-medium">
                <AuctionRelativeTimer itemId={id} />
              </span>
            </div>
            <div>
              <span className="font-semibold text-blue-700">Current Price:</span>{" "}
              <span className="text-blue-900 font-bold">{item.current_price}</span>
            </div>
            <div>
              <span className="font-semibold text-blue-700">Bid Increment:</span>{" "}
              <span className="text-blue-900 font-bold">{item.bid_increment}</span>
            </div>
          </div>

          {/* Winner / Seller / Bidder Section */}
          {winner ? (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold mb-4">
              Winner: {highestBidder ? highestBidder : "No winner"}
            </div>
          ) : user?.user_id === item.seller ? (
            <>
              <div className="text-yellow-700 font-medium mb-2">Please wait for the auction to get over.</div>
              <div className="flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="text-lg font-semibold text-blue-600">
                  Current Bid Price: <span className="font-bold">{item.current_price}</span>
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  Current Highest Bidder: <span className="font-bold">{highestBidder || "N/A"}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="text-lg font-semibold text-blue-600">
                  Current Bid Price: <span className="font-bold">{item.current_price}</span>
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  Current Highest Bidder: <span className="font-bold">{highestBidder || "N/A"}</span>
                </div>
              </div>
              {/* Bid Controls */}
              <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
                {user && user.username !== highestBidder ? (
                  <div className="flex items-center gap-4">
                    <button
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
                      onClick={handledec}
                    >
                      – Decrement
                    </button>
                    <input
                      type="number"
                      name="bid_amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                      readOnly
                      step={item.bid_increment}
                      placeholder={`${bidAmount || item.current_price}`}
                      className="w-28 text-center p-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold text-lg bg-white"
                      min="0"
                    />
                    <button
                      className="px-3 py-2 bg-green-100 text-green-600 rounded-lg font-semibold hover:bg-green-200 transition"
                      onClick={handleinc}
                    >
                      + Increment
                    </button>
                    <button
                      className="ml-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all duration-200"
                      onClick={handleBid}
                    >
                      Place Your Bid!
                    </button>
                  </div>
                ) : !user ? (
                  <div className="text-red-500 font-medium text-lg">
                    Please login to place a bid.
                  </div>
                ) : (
                  <div className="text-yellow-600 font-medium text-lg">
                    Wait for a new bid to be placed.
                  </div>
                )}
              </div>
            </>
          )}

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Description</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aitemdetail;
