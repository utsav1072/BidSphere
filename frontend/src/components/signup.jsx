import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useDispatch } from "react-redux";
import { login } from "../features/authentication/authSlice";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [status, setStatus] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {status === 1 ? (
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                    <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">LOGIN</h1>
                    <form className="space-y-5">
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-blue-500">
                            <FaUser className="text-gray-500 mr-3" />
                            <input type="text" placeholder="Username" required className="w-full bg-transparent focus:outline-none" />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-blue-500">
                            <FaLock className="text-gray-500 mr-3" />
                            <input type="password" placeholder="Password" required className="w-full bg-transparent focus:outline-none" />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 accent-blue-500" />Remember me
                            </label>
                            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold" onClick={() =>{ dispatch(login()); navigate("/")}}>Login</button>
                        <p className="text-center text-sm text-gray-600">Don't have an account? <a href="#" className="text-blue-500 hover:underline" onClick={() => {setStatus(2)}}>Register</a></p>
                    </form>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200 mt-6">
                    <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">REGISTRATION</h1>
                    <form className="space-y-5">
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-green-500">
                            <FaUser className="text-gray-500 mr-3" />
                            <input type="text" placeholder="Username" required className="w-full bg-transparent focus:outline-none" />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-green-500">
                            <IoIosMail className="text-gray-500 mr-3" />
                            <input type="email" placeholder="Email" required className="w-full bg-transparent focus:outline-none" />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-green-500">
                            <FaLock className="text-gray-500 mr-3" />
                            <input type="password" placeholder="Password" required className="w-full bg-transparent focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold" onClick={() => {dispatch(login());navigate("/")}}>Register</button>
                        <p className="text-center text-sm text-gray-600">Already have an account? <a href="#" className="text-green-500 hover:underline" onClick={() => {setStatus(1)}}>Login</a></p>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Signup;
