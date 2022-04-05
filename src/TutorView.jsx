import React, { useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, remove, set } from "firebase/database";
import CreatePoll from "./CreatePoll.jsx";
import PollAdmin from "./PollAdmin.jsx";
import "./styles/TutorView.css";

const database = getDatabase(firebaseApp);

const TutorView = () => {
  const [sessionId, setSessionId] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [isQuestion, setIsQuestion] = useState(false);

  const createDatabaseNodeWithSessionData = (sessionId) => {
    const path = `data/sessions/${sessionId}`;
    set(ref(database, path), {
      sesData: {
        started: true,
        questionAsked: false,
        sessionName,
      },
    });
  };
  const clearSession = () => {
    remove(ref(database, `data/sessions/${sessionId}`)).then(() => {
      setSessionId("");
      setIsQuestion(false);
      setSessionName("");
    }).catch(err => console.log(err))
  };

  const handleCopyClick = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(`localhost:3000/poll/${sessionId}`);
    } else {
      document.execCommand("copy", true, `localhost:3000/poll/${sessionId}`);
    }
  };

  return (
    <div>
      {!sessionId ? (
        <form
          className="sessionBox"
          onSubmit={() => {
            const sesString = "_" + Math.random().toString(36).slice(2, 9);
            setSessionId(sesString);
            createDatabaseNodeWithSessionData(sesString);
          }}
        >
          <label htmlFor="sesName">Session Name: </label>
          <input
            onChange={(e) => {
              setSessionName(e.target.value);
            }}
            value={sessionName}
            id="sesName"
            type="text"
          ></input>
          <button className="sesButton">Start session</button>
        </form>
      ) : (
        <div className="sessionBox">
          <p>
            {sessionName} :{" "}
            <span className="highlightText">
              localhost:3000/poll/{sessionId}
            </span>
            <button onClick={handleCopyClick} className="sesButton">
              Copy Link
            </button>
            <button className="sesButton" type="button" onClick={clearSession}>
              Clear session
            </button>
          </p>
        </div>
      )}

      {sessionId && !isQuestion ? (
        <CreatePoll
          sessionId={sessionId}
          isQuestion={isQuestion}
          setIsQuestion={setIsQuestion}
        />
      ) : null}
      {sessionId && isQuestion ? <PollAdmin sessionId={sessionId} /> : null}
    </div>
  );
};

export default TutorView;
