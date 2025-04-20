import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useSelector } from 'react-redux';
import { FiUploadCloud, FiUser, FiHome, FiPhone } from 'react-icons/fi';
import Swal from 'sweetalert2';

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const authTokens = useSelector((state) => state.auth.authTokens);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Image',
        text: 'Please choose a profile image before submitting!',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    const formData = new FormData();
    formData.append("full_name", fullname);
    formData.append("image", selectedFile);
    formData.append("address", address);
    formData.append("phone_number", phone);

    try {
      await axiosInstance.post('/test/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your changes have been saved successfully.',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.detail || 'Please try again.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Edit Profile
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="space-y-2">
            <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FiUser className="text-blue-600" />
              Full Name
            </label>
            <input 
              type="text" 
              placeholder="Name"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          {/* Image Upload Field */}
          <div className="space-y-2">
            <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FiUploadCloud className="text-blue-600" />
              Profile Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-2xl cursor-pointer transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  <FiUploadCloud className="w-8 h-8 text-blue-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {selectedFile?.name || "PNG, JPG up to 5MB"}
                  </p>
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FiHome className="text-blue-600" />
              Address
            </label>
            <input 
              type="text" 
              placeholder="Address"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Phone Number Field */}
          <div className="space-y-2">
            <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FiPhone className="text-blue-600" />
              Phone Number
            </label>
            <input 
              type="text" 
              placeholder="Phone Number"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
