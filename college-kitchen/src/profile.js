import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const currentUser = auth.currentUser

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Redirect to home page after sign-out
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile-page">
      <div className="profile-details">
        <h2>{currentUser.displayName}</h2>
        <p>Email: {currentUser.email}</p>
        {/* Add more user details here */}
        <button className='logout-button' onClick={handleSignOut}>Logout</button>
        <div className='home-button'>
          <br />
          <br />
          <button className='back-home' onClick={() => navigate("/home")}>< i class="ri-home-2-line"></i></button>
        </div>
        
      </div>
    </div>
  );
}

export default Profile;
