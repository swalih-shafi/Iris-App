import React, { useEffect, useState } from 'react';
import irisImage from '../assets/iris_flower.png'; // adjust path if needed
import '../styles/home.css'; // CSS you’ll define below

function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home-box">
        <img src={irisImage} alt="Iris Flower" className="iris-image" />
        <h1 className="welcome-text">Hello, {username || 'Guest'}!</h1>
      </div>
    </div>
  );
}

export default Home;
