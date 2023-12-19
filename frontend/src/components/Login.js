import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    let navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (email && password) {
      console.log('Form submitted:', userData);
      axios.post('https://login-signup-rxav.vercel.app/login', userData)
        .then((res) => {
          console.log(".......Login data",res.data,res.data.message, typeof res.data.message)
          if(res.data.message === "Login Done"){
            toast.success("User login successfully"); 
            navigate('/');
          }
          else{
            toast.warn("Something went wrong");
          }
          
        })
        .catch((error) => {
          console.error('Error during login:', error);
          toast.error("Error during login");
        });
    } else {
      toast.error("Please add mandatory fields");
    }
  };


  return (
    <>
    <ToastContainer/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 main_form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control input_login"
                id="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control input_login"
                id="password"
                placeholder="Enter password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          <div className="mt-3">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
