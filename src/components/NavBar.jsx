import React from "react";
import "../styles/NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import firebaseApp from "../firebase";

const auth = getAuth(firebaseApp);

const NavBar = () => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  const renderButtons = () => {
    if (user) {
      return (
        <div>
          <Link className="nav-link" to="/tutor">
            Polls
          </Link>
          <Link className="nav-link" to="/admin">
            Admin
          </Link>
          <button className="primaryButton" onClick={logout}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <Link className="primaryButton" to="/login">
          Tutor login
        </Link>
      );
    }
  };
  return (
    <nav>
      <Link to="/">
        <h1 className="grey-1">Northcoders Polling App</h1>
      </Link>
      {renderButtons()}
    </nav>
  );
};

export default NavBar;
