import React from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <h1 className="grey-1">Northcoders Polling App</h1>
      </Link>
      <Link className="primaryButton" to="/tutor">
        Login
      </Link>
    </nav>
  );
};

export default NavBar;
