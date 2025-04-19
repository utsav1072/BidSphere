import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  async function handlewatchlist(){
    const response = await axiosInstance.post('add/to/watchlist/',
      {
        item_id : id,
      },{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`,
      },
    })
    console.log(response);
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
      console.error("Error placing bid:", error.response ? error.response.data : error);
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
        const response = await axios.get(`http://127.0.0.1:8000/api/items/search/?itemid=${id}`);
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
        const response = await axiosInstance.get(`/auction/search/?q=${id}`);
        if (response.data.length > 0) {
          setHighestBidId(response.data[0].highest_bid);
        }
      } catch (error) {
        console.error("Error fetching highest bid:", error.response ? error.response.data : error);
      }
    }
    getHighestBid();
  }, [id, toggle]);

  useEffect(() => {
    if (highestBidId) {
      async function getHighestBidder() {
        try {
          const response = await axiosInstance.get(`/bids/${highestBidId}/`);
          const user = await axiosInstance.get(`user/?q=${response.data.bidder}`);
          setHighestBidder(user.data[0].username);
        } catch (error) {
          console.error("Error fetching highest bidder:", error.response ? error.response.data : error);
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
    return <p className="text-center text-lg font-semibold text-gray-500">Loading item details...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-3xl p-8 m-6 h-120 border border-gray-200">
      <div className="h-80 w-80 border-2 rounded-3xl overflow-hidden flex items-center justify-center bg-gray-100 shadow-md">
        <img src={item.image_url} alt={`image-of-item-${id}`} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 m-4 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>
          <button className="text-blue-500 hover:text-blue-600 font-semibold transition-all flex items-center" onClick={handlewatchlist}>
            <IoMdAdd className="text-xl mr-1" />
            Add to Watchlist
          </button>
        </div>
        <div className="mb-6 text-lg text-gray-700">
          <h1 className="mb-2">
            <span className="font-semibold">Time Left:</span> <AuctionRelativeTimer itemId={id} />
          </h1>
          <p>
            <span className="font-semibold">Current Price:</span> {item.current_price}
          </p>
        </div>
        {winner ? (
  <div> Winner : {highestBidder?highestBidder:"No winner"}</div>
) : (
  <>
    <div className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
      <div className="text-lg font-semibold text-blue-600">
        CURRENT BID PRICE - {item.current_price}
      </div>
      <div className="text-lg font-semibold text-blue-600">
        CURRENT HIGHEST BIDDER - {highestBidder || "N/A"}
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
      {user && user.username !== highestBidder ? (
        <div className="flex items-center justify-center gap-4">
          <button className="text-red-500 font-semibold" onClick={handledec}>
            decrement the price
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
          <button className="text-green-500 font-semibold" onClick={handleinc}>
            increment the price
          </button>
          <button
            className="h-12 w-60 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-600 transition-all duration-300"
            onClick={handleBid}
          >
            Place Your Bid!
          </button>
        </div>
      ) : !user ? (
        <div className="text-red-500 font-medium text-lg">
          Pls Login to Place a Bid
        </div>
      ) : (
        <div className="text-red-500 font-medium text-lg">
          wait for a new bid to get placed
        </div>
      )}
    </div>
  </>
)}
      </div>
    </div>
  );
};

export default Aitemdetail;
