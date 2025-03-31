import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fullname,setFullname] = useState('');

  const authTokens = useSelector((state) => state.auth.authTokens);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Save the selected file
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("full_name", fullname);
    formData.append("image", selectedFile); // Append the selected file

    try {
      const response = await axiosInstance.post('/test/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed, try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Profile Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
