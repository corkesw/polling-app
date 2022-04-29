import { getDatabase, onValue, ref, set, get } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PieMaker from "../PieChart/PieMaker";
import firebaseApp from "../../firebase";
import "../../styles/TutorView.css";
import { wipePoll } from "../../utils/localStorage.js";
import colours from "../../utils/colours";
import TutorSessionBar from "./TutorSessionBar";

const database = getDatabase(firebaseApp);

const PollAdmin = ({
  sessionId,
  setSessionId,
  sessionName,
  setSessionName,
  isUser,
}) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [reveal, setReveal] = useState(false);
  const navigate = useNavigate();

  const revealAnswer = () => {
    const path = `data/sessions/${sessionId}/pollData/reveal`;
    set(ref(database, path), !reveal);
  };
  const newQuestion = () => {
    wipePoll();
    navigate(`/tutor/${sessionId}`);
  };

  const reuseQuestion = () => {
    setReveal(false);
    navigate(`/tutor/${sessionId}`);
  };

  useEffect(() => {
    const path = `data/sessions/${sessionId}/pollData`;
    onValue(ref(database, path), (snapshot) => {
      const data = snapshot.val();
      // if logic required to prevent error when session is cleared and node is deleted
      if (data) {
        setQuestion(data.question);
        setReveal(data.reveal);
        setAnswers(() => {
          const answers = [];
          for (const key in data.answers) {
            answers.push({
              name: data.answers[key].answer,
              value: data.answers[key].votes,
              fill: colours[key],
            });
          }
          return answers;
        });
      } else {
        setQuestion("");
        setReveal(false);
        setAnswers([]);
      }
    });
  }, [sessionId]);

  return (
    <>
      {isUser ? (
        <>
          <TutorSessionBar
            sessionId={sessionId}
            setSessionId={setSessionId}
            sessionName={sessionName}
            setSessionName={setSessionName}
          />
          <div id="poll__admin">
            <h2>Poll Admin</h2>
            <h3>{question}</h3>

            {answers.length ? (
              <PieMaker answers={answers} revealChart={true} />
            ) : null}
            <div className="control__buttons">
              <button onClick={reuseQuestion} className="ses__button">
                Back
              </button>
              <button
                onClick={revealAnswer}
                className="ses__button"
                disabled={reveal}
              >
                {!reveal ? (
                  <span>Reveal Answer</span>
                ) : (
                  <span>Answer revealed</span>
                )}
              </button>
              <button onClick={newQuestion} className="ses__button">
                New Question
              </button>
            </div>
          </div>
        </>
      ) : (
        <Link className="primaryButton" to="/login">
          Tutor Login
        </Link>
      )}
    </>
  );
};

export default PollAdmin;
