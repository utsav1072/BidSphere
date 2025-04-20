import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const response = await fetch(`https://auctionhub.pythonanywhere.com/api/reset-password/${uidb64}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, password2 }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Password reset successful!');
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100/60 via-white/80 to-purple-100/60 py-12 px-4">
      <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100 p-10 flex flex-col items-center">
        <FiLock className="text-5xl text-blue-600 mb-4" />
        <h1 className="text-2xl font-extrabold text-blue-900 mb-6">Reset Your Password</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border-2 border-blue-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full bg-white border-2 border-blue-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {message && (
          <div className={`mt-6 w-full text-center font-semibold ${message.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
