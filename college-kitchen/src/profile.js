import React from 'react';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  
  return (
    <div className="profile-page">
      <div className="profile-details">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        {/* Add more user details here */}
        <button className='logout-button' >Logout</button>
      </div>
    </div>
  );
}

export default Profile;