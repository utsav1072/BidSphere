import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"                                                                                                        
function Profile() {
    const [user,setUser] = useState([]);
    const navigate = useNavigate();
    const authTokens = useSelector((state) => state.auth.authTokens);

    useEffect(() =>{
        async function getUser(){
            const response = await axiosInstance.get('/test/',{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authTokens?.access}`,
                  },
            })
            setUser(response.data.data)
        }
        getUser()
    },[])

    return (
        <div className="flex justify-between items-start p-10 bg-gray-100 min-h-screen">
            {/* Profile Card */}
            <div className="w-80 bg-white rounded-3xl p-6 shadow-lg border border-gray-300">
                <div className="border-2 rounded-full h-40 w-40 mx-auto flex items-center justify-center overflow-hidden bg-gray-200">
                    <img alt="Profile" src= {`http://127.0.0.1:8000/${user.image}`} className="h-full w-full object-cover"/>
                </div>
                <div className="text-center mt-4 text-lg font-semibold text-gray-800">User Name:{user.username}</div>
                <div className="text-center text-gray-500">user_email : {user.email}</div>
                <div className="text-center text-gray-500">user_address : {user.address}</div>
                <div className="text-center text-gray-500">user_phone number : {user.phone_number}</div>
                <button className="bg-blue-500 hover:bg-blue-600 p-2 mt-4 rounded-2xl text-white text-center font-medium cursor-pointer transition duration-300" onClick={() => navigate('/edit-profile')}>
                    Edit Profile
                </button>
                <div className="mt-6 text-center">
                    <div className="text-gray-700 font-medium">Current Balance:</div>
                    <div className="mt-2 bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded-md cursor-pointer transition duration-300 inline-block">
                        Add Money
                    </div>
                </div>
            </div>

            {/* Profile Actions */}
            <div className="w-2/3 space-y-6">
                <div className="w-full h-40 rounded-2xl border border-gray-300 bg-white shadow-md p-6 flex items-center text-lg font-medium text-gray-800 hover:shadow-lg transition" onClick={() => {navigate('/itemforbid')}}>
                    Place an Item for Bid
                </div>
                <div className="w-full h-40 rounded-2xl border border-gray-300 bg-white shadow-md p-6" onClick={() => navigate("/profile/participated-bids")}>
                    <h1 className="text-xl font-semibold text-gray-800">Participated Bids</h1>
                </div>
                <div className="w-full h-40 rounded-2xl border border-gray-300 bg-white shadow-md p-6" onClick={() => navigate("/profile/auction-summary")}>
                    <h1 className="text-xl font-semibold text-gray-800">Overall Summary</h1>
                </div>
            </div>
        </div>
    );
}

export default Profile;