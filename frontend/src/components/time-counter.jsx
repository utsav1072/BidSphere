import { useState, useEffect } from "react";
import { setWinner } from "../features/authentication/winnerSlice";
import { useDispatch } from "react-redux";

const AuctionRelativeTimer = ({ itemId }) => {
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEndTime = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/auction-timer/${itemId}/`);
        const data = await response.json();
        setEndTime(data.time_left);
      } catch (error) {
        console.error("Error fetching end time:", error);
      }
    };

    fetchEndTime();

    if(endTime !== "00:00:00"){
      const interval = setInterval(fetchEndTime, 1000); // Refresh every minute
      return () => clearInterval(interval);
    }
    else{
      dispatch(setWinner(true));
    }

  }, [endTime]);

  return <p>{endTime}</p>;
};

export default AuctionRelativeTimer;