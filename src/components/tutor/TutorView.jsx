import React, { useEffect, useState } from "react";
import firebaseApp from "../../firebase.js";
import CreatePoll from "./CreatePoll.jsx";
import PollAdmin from "./PollAdmin.jsx";
import "../../styles/TutorView.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, Route, Routes } from "react-router-dom";
import TutorSessionBar from "./TutorSessionBar.jsx";

const auth = getAuth(firebaseApp);

const TutorView = () => {
  const [sessionId, setSessionId] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    // check if user logged in - will prompt to login in if no user
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
            setSessionName={setSessionName}
            sessionName={sessionName}
          />
          <Routes>
            <Route path="/:sessionId" element={<CreatePoll />}></Route>
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