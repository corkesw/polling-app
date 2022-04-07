import React from "react";
import "./styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="contentBox">
        <h2 className="blue-1">{">"} I am a student</h2>
        <p>Your tutor will send you a unique link for your lecture!</p>
        <Link className="primaryButton" to="/poll/_z7tap9hra">
          Test page
        </Link>
      </div>
      <div className="contentBox">
        <h2 className="blue-1">{">"} I am a tutor</h2>
        <Link className="primaryButton" to="/login">
          Login
        </Link>
      </div>
      {/* <Link to="/admin">Admin</Link> */}
    </div>
  );
};

export default Home;
