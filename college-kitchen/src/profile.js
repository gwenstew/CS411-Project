import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
  };

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
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        {/* Add more user details here */}
        <button className='logout-button' onClick={handleSignOut}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
