import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/authentication/authSlice";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [show, setShow] = useState(false);
      
    const [regPassword2, setRegPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState(1);
    const [forgotEmail,setForgotEmail] = useState("");
    const [forgotMessage, setForgotMessage] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle Login
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
        navigate("/");
    };

    const handleforgot = (e) => {
        setStatus(2);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setForgotMessage('');
        try {
        const response = await fetch('https://auctionhub.pythonanywhere.com/api/forgot-password/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: forgotEmail }),
        });
        const data = await response.json();
        if (response.ok) {
            setForgotMessage(data.message || 'Password reset link sent to your email.');
        } else {
            setForgotMessage(data.error || 'Something went wrong.');
        }
        } catch (error) {
            setForgotMessage('Network error.');
        }
    };


    // Handle Registration
    const handleRegister = (e) => {
        e.preventDefault();
        // Dispatch registration action (create one in your Redux slice)
        dispatch(registerUser({
            email: regEmail,
            password: regPassword,
            username,
            password2: regPassword2
          }))
          .unwrap()
          .then((response) => {
            setStatus(1);          // or handle success
          })
          .catch((error) => {
            console.error('Registration failed:', error);
            setStatus(0);          // or handle error
          });
          
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4 sm:p-6">
        {status === 1 ? (
            // LOGIN FORM
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-gray-100 transition-all duration-300">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 tracking-tight">LOGIN</h1>
            <form className="space-y-6" onSubmit={handleLogin}>
                <div className="flex items-center border border-gray-200 rounded-xl p-4 bg-gray-50 focus-within:border-blue-400 transition">
                <FaUser className="text-blue-400 mr-3" />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                />
                </div>
                <div className="flex items-center border border-gray-200 rounded-xl p-4 bg-gray-50 focus-within:border-blue-400 transition">
                <FaLock className="text-blue-400 mr-3" />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-blue-500" />Remember me
                </label>
                <button type="button" className="text-blue-600 hover:underline font-medium" onClick={() => handleforgot()}>
                    Forgot Password?
                </button>
                </div>
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold shadow-md"
                >
                Login
                </button>
                <p className="text-center text-sm text-gray-500">
                Don't have an account?
                <a href="#" className="text-blue-600 hover:underline font-medium ml-1" onClick={() => setStatus(0)}>
                    Register
                </a>
                </p>
            </form>
            </div>
        ) : status === 0 ? (
            // REGISTRATION FORM
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-gray-100 mt-6 transition-all duration-300">
            <h1 className="text-4xl font-bold text-center mb-8 text-green-700 tracking-tight">REGISTRATION</h1>
            <form className="space-y-6" onSubmit={handleRegister}>
                <div className="flex items-center border border-gray-200 rounded-xl p-4 bg-gray-50 focus-within:border-green-400 transition">
                <FaUser className="text-green-400 mr-3" />
                <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                />
                </div>
                <div className="flex items-center border border-gray-200 rounded-xl p-4 bg-gray-50 focus-within:border-green-400 transition">
                <IoIosMail className="text-green-400 mr-3" />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                />
                </div>
                <div className="flex items-center border border-gray-200 rounded-xl p-4 bg-gray-50 focus-within:border-green-400 transition">
                <FaLock className="text-green-400 mr-3" />
                <div className="w-full flex flex-col gap-2">
                    <input
                    type="password"
                    placeholder="Password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                    />
                    <input
                    type="password"
                    placeholder="Re-enter Password"
                    required
                    value={regPassword2}
                    onChange={(e) => setRegPassword2(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                    />
                </div>
                </div>
                <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
                >
                Register
                </button>
                <p className="text-center text-sm text-gray-500">
                Already have an account?
                <a href="#" className="text-green-600 hover:underline font-medium ml-1" onClick={() => setStatus(1)}>
                    Login
                </a>
                </p>
            </form>
            </div>
        ) : (
            // FORGOT PASSWORD FORM
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-gray-100 mt-6 transition-all duration-300">
            <h1 className="text-4xl font-bold text-center mb-8 text-yellow-700 tracking-tight">Forgot Password</h1>
            <form className="space-y-6" onSubmit={handleForgotPassword}>
                <div className="flex items-center border border-gray-200 rounded-xl p-4 bg-gray-50 focus-within:border-yellow-400 transition">
                <FaUser className="text-yellow-400 mr-3" />
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                />
                </div>
                <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition font-semibold shadow-md"
                >
                Send Reset Link
                </button>
                <p className="text-center text-sm text-gray-500">
                Remembered your password?
                <a href="#" className="text-blue-600 hover:underline font-medium ml-1" onClick={() => setStatus(1)}>
                    Login
                </a>
                </p>
                {forgotMessage && (
                <div className="mt-4 text-yellow-600 text-center font-medium">{forgotMessage}</div>
                )}
            </form>
            </div>
        )}
        {show && (
            <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-fadeInOut text-lg font-semibold z-50">
            ✅ Login Successful!
            </div>
        )}
        </div>

    );
}

export default Signup;
