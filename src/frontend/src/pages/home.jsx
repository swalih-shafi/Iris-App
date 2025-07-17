import React, { useEffect, useState } from "react";
import irisImage from "../assets/iris_flower2.png"; 
import "../styles/home.css"; 
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token && storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="home-wrapper">
        <div className="home-box">
          <img src={irisImage} alt="Iris Flower" className="iris-image" />
          <h1 className="welcome-text">Hello, {username || "Guest"}!</h1>
          <h2 className="sub-text">
            Welcome to Iris, an iris classifier tool powered by Machine
            Learning.
          </h2>
        </div>
        <div className="home-buttons">
          <button onClick={() => navigate('/predict')}>Classify Species</button>
          <button onClick={() => navigate('/data')}>Explore Dataset</button>
        </div>
      </div>
    </>
  );
}

export default Home;
