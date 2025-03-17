import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

function Signup() {
    const [status, setStatus] = useState(1);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {status === 1 ? (
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">LOGIN</h1>
                    <form className="space-y-4">
                        <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <FaUser className="text-gray-500 mr-2" />
                            <input type="text" placeholder="Username" required className="w-full focus:outline-none" />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input type="password" placeholder="Password" required className="w-full focus:outline-none" />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-1" />Remember me
                            </label>
                            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
                        <p className="text-center text-sm">Don't have an account? <a href="#" className="text-blue-500 hover:underline" onClick={() => {setStatus(2)}}>Register</a></p>
                    </form>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-6">
                    <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">REGISTRATION</h1>
                    <form className="space-y-4">
                        <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <FaUser className="text-gray-500 mr-2" />
                            <input type="text" placeholder="Username" required className="w-full focus:outline-none" />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <IoIosMail className="text-gray-500 mr-2" />
                            <input type="email" placeholder="Email" required className="w-full focus:outline-none" />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input type="password" placeholder="Password" required className="w-full focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">Register</button>
                        <p className="text-center text-sm">Already have an account? <a href="#" className="text-green-500 hover:underline" onClick={() => {setStatus(1)}}>Login</a></p>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Signup;
