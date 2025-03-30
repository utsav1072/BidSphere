import { useState, useEffect } from "react";

const AuctionRelativeTimer = ({ itemId }) => {
  const [endTime, setEndTime] = useState("");

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
    const interval = setInterval(fetchEndTime, 1000); // Refresh every minute

    return () => clearInterval(interval);
  }, [itemId]);

  return <p>{endTime}</p>;
};

export default AuctionRelativeTimer;