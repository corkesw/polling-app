import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, remove, set } from "firebase/database";
import "./styles/TutorView.css";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

const TutorSessionBar = ({
  sessionId,
  setSessionId,
  setIsQuestion,
  setSessionName,
  sessionName,
}) => {
  const navigate = useNavigate();
  const clearSession = () => {
    remove(ref(database, `data/sessions/${sessionId}`))
      .then(() => {
        setSessionId("");
        setIsQuestion(false);
        setSessionName("");
        navigate("/tutor");
      })
      .catch((err) => console.log(err));
  };
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

  const handleSubmit = (e) => {
    const sesString = "_" + Math.random().toString(36).slice(2, 9);
    e.preventDefault();
    setSessionId(sesString);
    createDatabaseNodeWithSessionData(sesString);
    navigate(`/tutor/${sesString}`);
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
        <form className="sessionBox" onSubmit={handleSubmit}>
          <label className="input" htmlFor="sesName">
            Session Name:{" "}
          </label>
          <input
            className="input"
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
    </div>
  );
};

export default TutorSessionBar;
