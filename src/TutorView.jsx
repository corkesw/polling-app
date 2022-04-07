import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase } from "firebase/database";
import CreatePoll from "./CreatePoll.jsx";
import PollAdmin from "./PollAdmin.jsx";
import "./styles/TutorView.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import TutorSessionBar from "./TutorSessionBar.jsx";

const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

const TutorView = () => {
  const [sessionId, setSessionId] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [isQuestion, setIsQuestion] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    });
  }, []);

  return (
    <>
      {isUser ? (
        <div>
          <TutorSessionBar
            sessionId={sessionId}
            setSessionId={setSessionId}
            setIsQuestion={setIsQuestion}
            setSessionName={setSessionName}
            sessionName={sessionName}
          />
          <Routes>
            <Route
              path="/:sessionId"
              element={
                <CreatePoll
                  isQuestion={isQuestion}
                  setIsQuestion={setIsQuestion}
                />
              }
            ></Route>
            <Route
              path="/:sessionId/admin"
              element={
                <PollAdmin sessionId={sessionId} setSessionId={setSessionId} />
              }
            ></Route>
          </Routes>

        </div>
      ) : (
        <Link className="primaryButton" to="/login">
          Tutor Login
        </Link>
      )}
    </>
  );
};

export default TutorView;
