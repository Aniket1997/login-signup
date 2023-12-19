import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Add your signup logic here
    const {username,email,password,confirmPassword,mobileNumber} = userData;
    if(username && email && password && confirmPassword && mobileNumber){
        console.log('Form submitted:', userData);
        axios.post('http://localhost:9002/register',userData).then((res)=>{
            console.log(res);
            toast.done("User register successfully");
        });
    }
    else{
        toast.error("Please add mandatory fields");
    }
    
  };

  return (
    <>
    <ToastContainer/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 main_form">
            <div className="form-group mb-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control input_signup"
                id="username"
                placeholder="Enter username"
                value={userData.username}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleRegister}>
              Sign Up
            </button>
         
          <div className="mt-3">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
