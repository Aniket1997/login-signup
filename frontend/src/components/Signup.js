// Signup.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    profilePicture: null,
  });

  const handleFileInputChange = (e) => {
    setUserData({ ...userData, profilePicture: e.target.files[0] });
  };

  const handleProfilePictureClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, mobileNumber, profilePicture } = userData;
    console.log("...user data from frontend",userData);

    if (username && email && password && confirmPassword && mobileNumber) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('mobileNumber', mobileNumber);
      formData.append('profilePicture', profilePicture);

      try {
        const res = await axios.post('http://localhost:9002/register', formData);
        const userId = res.data.userId;
        toast.success('User registered successfully');
        navigate('/', { state: { userId: userId } });
      } catch (error) {
        console.error(error);

        if (error.response && error.response.data && error.response.data.message) {
          toast.error(`Error: ${error.response.data.message}`);
        } else {
          toast.error('Error registering user');
        }
      }
    } else {
      toast.error('Please add mandatory fields');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 main_form">
          <div style={{textAlign:'center'}}>
            <label className='brand_name'>Progress Hub</label>
          </div>
          <label htmlFor="username">Upload ypur profile picture</label>
          <div className="form-group mb-2 profile-picture-container" >
              <div onClick={handleProfilePictureClick} className='add_profile_image'>
                <VscAccount size={80} />
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileInputChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </div>
            <div className="form-group mb-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control input_signup"
                id="username"
                placeholder="Enter username"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control input_signup"
                id="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control input_signup"
                id="password"
                placeholder="Enter password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                className="form-control input_signup"
                id="confirmPassword"
                placeholder="Confirm password"
                value={userData.confirmPassword}
                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="mobile-number">Mobile Number</label>
              <input
                type="tel"
                className="form-control input_signup"
                id="mobileNumber"
                placeholder="Enter mobile number"
                value={userData.mobileNumber}
                onChange={(e) => setUserData({ ...userData, mobileNumber: e.target.value })}
                required
              />
            </div>
            
            <button type="button" className="btn btn-primary" onClick={handleRegister}>
              Sign Up
            </button>
            <div className="mt-3">
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
