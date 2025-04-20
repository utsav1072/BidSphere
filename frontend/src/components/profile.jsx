import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FiEdit2, FiPlusCircle, FiBox, FiTrendingUp, FiAward } from "react-icons/fi";

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const authTokens = useSelector((state) => state.auth.authTokens);

  useEffect(() => {
    async function getUser() {
      const response = await axiosInstance.get('/test/', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
      setUser(response.data.data);
    }
    getUser();
  }, [authTokens]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 via-white/80 to-purple-100/60 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10">
        {/* Profile Card */}
        <div className="flex-1 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100 p-10 flex flex-col items-center">
          <div className="border-4 border-blue-200 rounded-full h-40 w-40 flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-200 via-white to-purple-200 shadow-lg">
            <img
              alt="Profile"
              src={user.image ? `https://auctionhub.pythonanywhere.com/${user.image}` : "/default-profile.png"}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-6 text-3xl font-extrabold text-blue-900">{user.username || "Username"}</div>
          <div className="text-blue-700 mt-1">{user.email || "user@email.com"}</div>
          <div className="text-blue-600 mt-1">{user.address || "Address not set"}</div>
          <div className="text-blue-600 mt-1">Phone: {user.phone_number || "N/A"}</div>
          <button
            className="flex items-center gap-2 w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 mt-6 py-2 rounded-xl text-white font-bold shadow-md transition"
            onClick={() => navigate('/edit-profile')}
          >
            <FiEdit2 className="text-lg" />
            Edit Profile
          </button>
          <div className="mt-10 w-full text-center">
            <div className="text-blue-800 font-medium text-lg">Current Balance:</div>
            <div className="text-2xl font-bold text-blue-700 mt-1 mb-3">
              ₹{user.balance || "0.00"}
            </div>
            <button
              className="flex items-center gap-2 mx-auto bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2 rounded-lg font-semibold shadow transition"
              // onClick={...} // Add logic for adding money
            >
              <FiPlusCircle />
              Add Money
            </button>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="flex-[1.2] flex flex-col gap-8 justify-center">
          <ActionCard
            icon={<FiBox className="text-3xl text-indigo-600" />}
            label="Place an Item for Bid"
            onClick={() => navigate('/itemforbid')}
          />
          <ActionCard
            icon={<FiTrendingUp className="text-3xl text-indigo-600" />}
            label="Participated Bids"
            onClick={() => navigate("/profile/participated-bids")}
          />
          <ActionCard
            icon={<FiAward className="text-3xl text-indigo-600" />}
            label="Overall Summary"
            onClick={() => navigate("/profile/auction-summary")}
          />
        </div>
      </div>
    </div>
  );
}

// Reusable Action Card component for clean code
function ActionCard({ icon, label, onClick }) {
  return (
    <div
      className="flex items-center gap-6 bg-white/70 backdrop-blur-lg border border-blue-100 shadow-lg rounded-2xl px-8 py-7 cursor-pointer hover:bg-blue-50/70 hover:shadow-2xl transition"
      onClick={onClick}
    >
      <div className="flex-shrink-0 bg-blue-100 rounded-full p-4">
        {icon}
      </div>
      <span className="text-2xl font-semibold text-blue-900">{label}</span>
    </div>
  );
}

export default Profile;
