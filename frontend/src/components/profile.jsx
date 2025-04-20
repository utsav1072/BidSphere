import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function Profile() {
    const [user, setUser] = useState([]);
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
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-8 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
            {/* Profile Card */}
            <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 mx-auto">
                <div className="border-4 border-blue-100 rounded-full h-40 w-40 mx-auto flex items-center justify-center overflow-hidden bg-gray-100 shadow">
                    <img
                        alt="Profile"
                        src={`http://127.0.0.1:8000/${user.image}`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="text-center mt-6 text-2xl font-bold text-gray-800">{user.username}</div>
                <div className="text-center text-gray-500 mt-1">{user.email}</div>
                <div className="text-center text-gray-500 mt-1">{user.address}</div>
                <div className="text-center text-gray-500 mt-1">Phone: {user.phone_number}</div>
                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6 py-2 rounded-xl text-white font-semibold shadow transition duration-200"
                    onClick={() => navigate('/edit-profile')}
                >
                    Edit Profile
                </button>
                <div className="mt-8 text-center">
                    <div className="text-gray-700 font-medium">Current Balance:</div>
                    <button
                        className="mt-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow transition"
                        // onClick={...} // Add logic for adding money
                    >
                        Add Money
                    </button>
                </div>
            </div>

            {/* Profile Actions */}
            <div className="flex-1 flex flex-col gap-6">
                <div
                    className="w-full h-36 rounded-2xl border border-blue-200 bg-white shadow-lg p-8 flex items-center text-xl font-semibold text-blue-800 cursor-pointer hover:bg-blue-50 hover:shadow-2xl transition"
                    onClick={() => navigate('/itemforbid')}
                >
                    <span className="mx-auto">Place an Item for Bid</span>
                </div>
                <div
                    className="w-full h-36 rounded-2xl border border-blue-200 bg-white shadow-lg p-8 flex items-center cursor-pointer hover:bg-blue-50 hover:shadow-2xl transition"
                    onClick={() => navigate("/profile/participated-bids")}
                >
                    <span className="mx-auto text-xl font-semibold text-blue-800">Participated Bids</span>
                </div>
                <div
                    className="w-full h-36 rounded-2xl border border-blue-200 bg-white shadow-lg p-8 flex items-center cursor-pointer hover:bg-blue-50 hover:shadow-2xl transition"
                    onClick={() => navigate("/profile/auction-summary")}
                >
                    <span className="mx-auto text-xl font-semibold text-blue-800">Overall Summary</span>
                </div>
            </div>
        </div>
    );
}

export default Profile;
