import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Home Page</h1>
        <div className="profile-favorites">
          <button className="profile-button">
          < i class="ri-user-line"></i> Profile</button>
          <button className="favorites-button"> 
            <i class="ri-heart-line"></i> Favorites </button>
        </div>
      </header>
      <div className="content">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Home;