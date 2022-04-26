import { getDatabase, onValue, ref, set, get } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PieMaker from "../PieMaker";
import firebaseApp from "../../firebase";
import "../../styles/TutorView.css";
import { wipePoll } from "../../utils/localStorage.js";

const database = getDatabase(firebaseApp);

const PollAdmin = ({sessionId}) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [reveal, setReveal] = useState(false);
  const navigate = useNavigate();

  const colours = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];


  const revealAnswer = () => {
    const path = `data/sessions/${sessionId}/pollData/reveal`;
    set(ref(database, path), !reveal);
  };

  const newQuestion = () => {
    wipePoll();
    navigate(`/tutor/${sessionId}`);
  };

  const reuseQuestion = () => {
    setReveal(false)
    navigate(`/tutor/${sessionId}`)
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
      <h3>Poll Admin</h3>
      <p>{question}</p>

      {answers.length ? <PieMaker answers={answers} /> : null}
      <button onClick={reuseQuestion} className="tutor__button ses__button">
        Back
      </button>
      <button
        onClick={revealAnswer}
        className="tutor__button ses__button"
        disabled={reveal}
      >
        {!reveal ? <span>Reveal Answer</span> : <span>Answer revealed</span>}
      </button>
      <button onClick={newQuestion} className="tutor__button ses__button">
        New Question
      </button>
     
    </>
  );
};

export default PollAdmin;
