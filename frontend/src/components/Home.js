import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChartPie } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import '../css/Home.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PieLoader from './PieLoader';

const Home = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  console.log(userId);
  const [userDetails, setUserDetails] = useState(null);
  const profilePictureUrl = userDetails ? userDetails.profilePicture : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9002/users');
        console.log("........All Users Response", response.data.users);
        setAllUsers(response.data.users);
        const currentUser = response.data.users.find(user => user._id === userId);

      if (currentUser) {
        console.log(currentUser);
        setUserDetails(currentUser);
      } else {
        console.log("User not found");
      }
      } catch (error) {
        console.error('Error fetching all users:', error);
        // Handle the error as needed
      }
    };

    fetchAllUsers();
  }, []);

  if (allUsers.length === 0) {
    // Return loading or handle the case when userId, userDetails, or allUsers are not available
    return (<>
        <div>
        <PieLoader/>
        </div>
      </>);
  }
  const defaultProfilePictureUrl = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";

  const getProfilePictureUrl = () => {
    if (userDetails && userDetails.profilePicture && userDetails.profilePicture.data) {
      const arrayBuffer = userDetails.profilePicture.data.data;
      const uint8Array = new Uint8Array(arrayBuffer);
      const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
      return `data:${userDetails.profilePicture.contentType};base64,${base64String}`;
    } else {
      return defaultProfilePictureUrl;
    }
  };
  return (
    <>
      <div className="navbar_brand">
        <div className='row'>
        <div className='col-md-4'>
          <FaChartPie className="zoom-in-icon" size={40}/> 
          <label className='brand_name_home'>Progress Hub</label>
        </div>
        <div className='col-md-4 search-div'>
          <BiSearchAlt size={25} color='#154360' className='search_task_icon'/>  
          <input className='search_input' placeholder='Search task ...'/>
        </div>
        <div className='col-md-4 profile_manage'>
          <img src={getProfilePictureUrl()} class="rounded-circle" style={{width: "47px",height: '40px'}}
          alt="Avatar" />
        </div>
        
        </div>
           
            
      </div>
    </>
  );
};

export default Home;
