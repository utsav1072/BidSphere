import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(`http://localhost:8000/api/reset-password/${uidb64}/${token}/`, {
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent focus:outline-none border p-2 my-2"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          required
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className="w-full bg-transparent focus:outline-none border p-2 my-2"
        />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Reset Password
        </button>
      </form>
      {message && <div className="mt-4 text-blue-600">{message}</div>}
    </div>
  );
};

export default ResetPassword;
