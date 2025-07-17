import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import pfp from "../assets/pfp.png";
import irisImage from "../assets/iris_flower2.png";
import journey from "../assets/journey.png";
import open from "../assets/open.png";
import predict from "../assets/predict.png";
import interact from "../assets/interact.png";
import "../styles/home.css";
import "../styles/landing.css";
import {
  FaSeedling,
  FaEnvelope,
  FaGithub,
  FaPython,
  FaCode,
  FaFileCode,
  FaLinkedin,
} from "react-icons/fa6";

function Landing({ username }) {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="landing-wrapper">
        {/* HERO SECTION */}
        <div className="hero-box">
          <img src={irisImage} alt="Iris Flower" className="iris-image" />
          <div className="text">
            <h1 className="welcome-text">
              Welcome to <span className="iris-highlight">Iris</span>
            </h1>
            <h2 className="sub-text">
              An elegant, beginner-friendly Iris classifier built using modern
              machine learning tools.
            </h2>
          </div>
          <div className="home-buttons">
            <button onClick={() => navigate("/predict")}>Use Classifier</button>
            <button onClick={() => navigate("/data")}>Explore Dataset</button>
          </div>
        </div>
        {/* WHY IRIS SCROLLER */} {/* to be done later */}
        {/* <div className="why-scroll">
          <div className="why-slide">
            <h2>🌸 A Classic ML Dataset</h2>
            <p>
              The Iris dataset is a timeless machine learning benchmark used to
              teach classification models in an intuitive and visual way.
            </p>
          </div>
          <div className="why-slide">
            <h2>📈 Easy to Understand</h2>
            <p>
              With only four input features, Iris makes it simple to visualize,
              analyze, and learn classification patterns effectively.
            </p>
          </div>
          <div className="why-slide">
            <h2>💡 Great for Beginners</h2>
            <p>
              It’s often the first dataset every machine learning student
              explores—fun, safe, and educational!
            </p>
          </div>
        </div> */}
        {/* FEATURE CARDS */}
        <div className="feature-section">
          <div className="feature-card">
            <h3>Instant Predictions</h3>
            <img src={predict} id="p" alt="Instant Predictions" />
            <p>
              Classify an iris flower in real time using your custom inputs.
            </p>
            <button onClick={() => navigate("/predict")}>Use Classifier</button>
          </div>
          <div className="feature-card">
            <h3>Interactive Dataset</h3>
            <img src={interact} id="i" alt="Interactive Dataset" />
            <p>
              Explore and filter the full Iris dataset with modern table tools
              and sorting.
            </p>
            <button onClick={() => navigate("/data")}>Explore Dataset</button>
          </div>
          <div className="feature-card">
            <h3>Model Journey</h3>
            <img src={journey} id="j" alt="Model Card" />
            <p>
              Learn how this model was built on Google Colab using XGBoost. View
              the full notebook:
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://colab.research.google.com/drive/1wQPGcTryBWR2YCFI-3D3uOzhLjzReb_v?usp=sharing"
                )
              }
            >
              View Colab
            </button>
          </div>
          <div className="feature-card">
            <h3>Open Source</h3>
            <img src={open} id="o" alt="Open Source" />
            <p>
              Built using React, FastAPI, and TinyDB — this project is fully
              transparent and yours to remix.
            </p>
            <button
              onClick={() =>
                window.open("https://github.com/swalih-shafi/Iris-App")
              }
            >
              View Repository
            </button>
          </div>
        </div>
        {/* ABOUT SECTION */}
        <div className="about-section">
          <img src={pfp} alt="Your Profile" className="about-img" />
          <div className="about-text">
            <div className="about-title">
              <h1>Swalih Shafi</h1>
              <h3>Web Developer & AI/ML Enthusiast</h3>
            </div>
            <p className="about-passage">
              The Iris project was a journey of expanding upon a simple solution
              to deliver a comprehensive product that meets professional
              expectations. What could have been a simple input - output job, I
              wanted to create a user-centric website with more features
              surrounding the classifier and its dataset. The project was done
              with a <b>Python backend</b> (FastAPI, Uvicorn, TinyDB) and a{" "}
              <b>React-Vite frontend</b>. The model implementation was completed
              after basic Exploratory Data Analysis and model comparison charts,
              with the <b>XGBoost model</b> being chosen as heart of the Iris
              system. This was a fun, educational venture intent on building a
              full-stack solution with a structured approach, and at some point,
              I was just having fun with it. Thank you for visiting the Iris
              project!
            </p>
          </div>
        </div>
      </div>
      {/* FOOTER SECTION */}
      <footer className="site-footer">
        <div className="logo-section footer-logo" onClick={() => navigate("/")}>
          <FaSeedling className="logo-icon" />
          <span className="app-name">IRIS</span>
        </div>
        <div className="reserved">
          © {new Date().getFullYear()} Iris Project. All rights reserved.
        </div>
        <div className="footer-links" style={{color:'white'}}>
          <a href="mailto:swalihshafi@gmail.com">
            <FaEnvelope className="footer-icon"/>
          </a>
          <a href="https://www.linkedin.com/in/swalih-shafi-4b607b223/" target="_blank">
            <FaLinkedin className="footer-icon" />
          </a>
          <a href="https://colab.research.google.com/drive/1wQPGcTryBWR2YCFI-3D3uOzhLjzReb_v?usp=sharing" target="_blank">
            <FaFileCode className="footer-icon" />
          </a>
          <a
            href="https://github.com/swalih-shafi/Iris-App"
            target="_blank"
          >
            <FaGithub className="footer-icon" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Landing;
