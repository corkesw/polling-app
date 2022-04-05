import React, { useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, set } from "firebase/database";
import "./styles/TutorView.css";

const database = getDatabase(firebaseApp);

const CreatePoll = ({ sessionId, setIsQuestion }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]);

  // controlled component for question
  const questionChange = (e) => {
    setQuestion(e.target.value);
  };
  // controlled component to update answer array
  const answerChange = (e, index) => {
    setAnswers((currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers[index] = e.target.value;
      return updatedAnswers;
    });
  };
  // adds an answer field if last answer field loses focus or if 'add' button is clicked
  const addAnswer = (index) => {
    setAnswers((currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers.push("");
      return updatedAnswers;
    });
  };

  // removes the answer at that index and closes the answer field
  const removeAnswer = (index) => {
    console.log(index);
    setAnswers((currentAnswers) => {
      const updatedAnswers = currentAnswers.filter((answer, i) => {
        return index !== i;
      });
      return updatedAnswers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //create answer object
    const answerObject = {};
    answers.forEach((answer, index) => {
      if (answer.trim()) {
        answerObject[index] = {
          answer,
          votes: 0,
        };
      }
    });
    answerObject.votesCast = 0;
    //set database with current poll data
    const path = `data/sessions/${sessionId}/pollData`;
    set(ref(database, path), {
      answers: answerObject,
      question,
      correctAnswer: 1,
      reveal: false,
    })
      .then(() => {
        setIsQuestion(true); // switches tutor's view to poll admin
        setAnswers(() => {
          return [];
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="contentBox">
      <h3 className="heading">Create Poll</h3>
      <form onSubmit={handleSubmit}>
        {}
        <div className="inputLine question">
          <label htmlFor="question">Question</label>
          <input
            tabIndex="1"
            onChange={questionChange}
            type="text"
            id="question"
          />
        </div>
        {answers.map((_, index) => {
          return (
            <div className="inputLine" key={index}>
              <label htmlFor={`answer${index + 1}`}>Answer {index + 1}</label>

              <input
                onKeyDown={(e) => {
                  if (e.key === "Tab" && index === answers.length - 1) {
                    addAnswer();
                  }
                }}
                onChange={(e) => {
                  answerChange(e, index);
                }}
                type="text"
                id={`answer${index + 1}`}
                value={answers[index]}
                tabIndex={index + 2}
              ></input>
              <button
                onClick={() => {
                  removeAnswer(index);
                }}
                type="button"
              >
                X
              </button>
            </div>
          );
        })}
        <div className="inputLine">
          <span></span>
          <button
            onClick={() => {
              addAnswer();
            }}
            type="button"
          >
            Add answer
          </button>
        </div>
        <div className="inputLine">
          <span></span>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
