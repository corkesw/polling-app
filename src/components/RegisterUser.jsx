import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/LoginView.css";
import firebaseApp from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterUser = ({ auth }) => {
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
  }, [loading]);

  const register = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/tutor");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="contentBox align-left">
      <h2 className="blue-1">Register</h2>
      <form onSubmit={register}>
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
        <button className="primaryButton">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
