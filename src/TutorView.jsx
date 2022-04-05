import React, { useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, remove, set } from "firebase/database";
import CreatePoll from "./CreatePoll.jsx";

const database = getDatabase(firebaseApp);

const TutorView = () => {
  const [sesId, setSesId] = useState(null);
  const [sesName, setSesName] = useState("");

  const createNode = (sesId) => {
    const path = `data/sessions/${sesId}`;
    set(ref(database, path), {
      sesData: {
        started: true,
        questionAsked: false,
        sesName,
      },
    });
  };
  const clearSession = () => {
    remove(ref(database, `data/sessions/${sesId}`));
    setSesId(null);
  };
  return (
    <div>
      <hr></hr>
      {!sesId ? (
        <form>
          <label htmlFor="sesName"></label>
          <input
            onChange={(e) => {
              setSesName(e.target.value);
            }}
            value={sesName}
            id="sesName"
            type="text"
          ></input>
          <button
            onClick={() => {
              const sesString = "_" + Math.random().toString(36).substr(2, 9);
              setSesId(sesString);
              createNode(sesString);
            }}
          >
            Start session
          </button>
        </form>
      ) : (
        <div>
          <p>
            session link : localhost:3000/poll/{sesId}
            <button onClick={clearSession}>Clear session</button>
          </p>
        </div>
      )}

      {sesId ? <CreatePoll sesId={sesId} /> : null}
    </div>
  );
};

export default TutorView;
