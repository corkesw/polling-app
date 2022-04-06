import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/LoginView.css";
import firebaseApp from "../src/firebase.js";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

const RegisterView = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/tutor");
  }, [user, loading, navigate]);

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
    <div className="contentBox">
      <h2 className="blue-2">login</h2>
      <form onSubmit={register}>
        <label htmlFor="name">name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
    </div>
  );
};

export default RegisterView;
