import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/LoginView.css";
import firebaseApp from "../src/firebase.js";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

const LoginView = () => {
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/tutor");
  }, [user, loading, navigate]);

  const logInWithEmailAndPassword = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/tutor");
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  return (
    <div className="contentBox">
      <h2 className="blue-2">login</h2>
      <form onSubmit={logInWithEmailAndPassword}>
        <label htmlFor="email">email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="secondaryButton">Login</button>
      </form>
      <Link className="primaryButton" to="/register">
        Register
      </Link>
    </div>
  );
};

export default LoginView;
