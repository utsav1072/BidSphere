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
        const response = await fetch('http://localhost:8000/api/forgot-password/', {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {status === 1 ? (
                // ✅ LOGIN FORM
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                    <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">LOGIN</h1>
                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-blue-500">
                            <FaUser className="text-gray-500 mr-3" />
                            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent focus:outline-none" />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-blue-500">
                            <FaLock className="text-gray-500 mr-3" />
                            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent focus:outline-none" />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 accent-blue-500" />Remember me
                            </label>
                            <button  className="text-blue-500 hover:underline" onClick={() => handleforgot()}>Forgot Password?</button>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">Login</button>
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account? 
                            <a href="#" className="text-blue-500 hover:underline" onClick={() => setStatus(2)}> Register</a>
                        </p>
                    </form>
                </div>
            ) : status === 0 ? (
                // ✅ REGISTRATION FORM
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200 mt-6">
                    <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">REGISTRATION</h1>
                    <form className="space-y-5" onSubmit={handleRegister}>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-green-500">
                            <FaUser className="text-gray-500 mr-3" />
                            <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-transparent focus:outline-none" />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-green-500">
                            <IoIosMail className="text-gray-500 mr-3" />
                            <input type="email" placeholder="Email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="w-full bg-transparent focus:outline-none" />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-green-500">
                            <FaLock className="text-gray-500 mr-3" />
                            <div>
                            <input type="password" placeholder="Password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="w-full bg-transparent focus:outline-none" />
                            <input type="password" placeholder="Re-enter Password" required value={regPassword2} onChange={(e) => setRegPassword2(e.target.value)} className="w-full bg-transparent focus:outline-none" />
                            </div>
                            
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">Register</button>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account? 
                            <a href="#" className="text-green-500 hover:underline" onClick={() => setStatus(1)}> Login</a>
                        </p>
                    </form>
                </div>
            ):(
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200 mt-6">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Forgot Password</h1>
                <form className="space-y-5" onSubmit={handleForgotPassword}>
                  <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-yellow-500">
                    <FaUser className="text-gray-500 mr-3" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition font-semibold"
                  >
                    Send Reset Link
                  </button>
                  <p className="text-center text-sm text-gray-600">
                    Remembered your password?
                    <a href="#" className="text-blue-500 hover:underline" onClick={() => setStatus(1)}> Login</a>
                  </p>
                  {forgotMessage && (
                    <div className="mt-4 text-yellow-600 text-center">{forgotMessage}</div>
                  )}
                </form>
              </div>
            )}
            {show && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeInOut">
                  ✅ Login Successful!
                </div>
            )}
        </div>
    );
}

export default Signup;
