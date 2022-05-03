import React, { useEffect, useState } from "react";
import firebaseApp from "../../firebase.js";
import { getDatabase, ref, set } from "firebase/database";
import "../../styles/TutorView.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { wipePoll } from "../../utils/localStorage.js";
import ErrorFeedback from "../adminComponents/ErrorFeedback.jsx";
import TutorSessionBar from "./TutorSessionBar.jsx";

const database = getDatabase(firebaseApp);

const CreatePoll = ({
  sessionId,
  setSessionId,
  sessionName,
  setSessionName,
  isUser,
}) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [correctAnswers, setCorrectAnswers] = useState([]); // array to allow for multiple correct answers beyond MVP
  const navigate = useNavigate();
  const { sessionIdFromParams } = useParams();

  useEffect(() => {
    const localQuestion = localStorage.getItem("question");
    const localAnswers = localStorage.getItem("answers");
    const localCorrectAnswers = localStorage.getItem("correctAnswers");
    console.log(localQuestion);
    // check local storage for question data if navigating back from admin or page refresh
    if (localQuestion) {
      setQuestion(localQuestion);
    } else {
      setQuestion("");
    }
    if (localAnswers) {
      const parsedLocalAnswers = JSON.parse(localAnswers);
      setAnswers(parsedLocalAnswers);
    } else {
      setAnswers(["", ""]);
    }
    if (localCorrectAnswers) {
      const parsedLocalCorrectAnswers = JSON.parse(localCorrectAnswers);
      setCorrectAnswers(parsedLocalCorrectAnswers);
    } else {
      setCorrectAnswers([]);
    }
  }, [sessionId]);

  // controlled component for question input
  const questionChange = (e) => {
    setQuestion(e.target.value);
    localStorage.setItem("question", e.target.value);
  };

  // controlled component to update answer array
  const answerChange = (e, index) => {
    setAnswers((currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers[index] = e.target.value;
      const localAnswers = JSON.stringify(updatedAnswers);
      localStorage.setItem("answers", localAnswers);
      return updatedAnswers;
    });
  };

  // adds an answer field if last answer field is tabbed away from or if 'add' button is clicked
  const addAnswer = (index) => {
    setAnswers((currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers.push("");
      const localAnswers = JSON.stringify(updatedAnswers);
      localStorage.setItem("answers", localAnswers);
      return updatedAnswers;
    });
  };

  // removes the answer at that index and closes the answer field
  const removeAnswer = (index) => {
    setAnswers((currentAnswers) => {
      const updatedAnswers = currentAnswers.filter((answer, i) => {
        return index !== i;
      });
      const localAnswers = JSON.stringify(updatedAnswers);
      localStorage.setItem("answers", localAnswers);
      return updatedAnswers;
    });
    // updates the correct answers array to remove and renumber any indices as required
    setCorrectAnswers((currentAnswers) => {
      const removedCorrect = currentAnswers.filter((item) => {
        return item !== index;
      });
      const updatedCorrectAnswers = removedCorrect.map((item) => {
        if (item < index) return item;
        else return item - 1;
      });
      const localCorrectAnswers = JSON.stringify(updatedCorrectAnswers);
      localStorage.setItem("correctAnswers", localCorrectAnswers);
      return updatedCorrectAnswers;
    });
  };

  // updates the correct answers array if items are checked or unchecked
  const handleCheckBox = (e, index) => {
    if (e.target.checked) {
      setCorrectAnswers(() => {
        const updatedCorrectAnswers = [index];
        const localCorrectAnswers = JSON.stringify(updatedCorrectAnswers);
        localStorage.setItem("correctAnswers", localCorrectAnswers);
        return updatedCorrectAnswers;
      });
    }
    if (!e.target.checked) {
      setCorrectAnswers((currentCorrectAnswers) => {
        const updatedCorrectAnswers = currentCorrectAnswers.filter(
          (item) => item !== index
        );
        const localCorrectAnswers = JSON.stringify(updatedCorrectAnswers);
        localStorage.setItem("correctAnswers", localCorrectAnswers);
        return updatedCorrectAnswers;
      });
    }
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
          isCorrect: correctAnswers.includes(index),
        };
      }
    });

    //set database with current poll data
    const path = `data/sessions/${sessionId}/pollData`;
    set(ref(database, path), {
      answers: answerObject,
      question,
      reveal: false,
      question_id: "_" + Math.random().toString(36).slice(2, 9),
    })
      .then(() => {
        setAnswers(() => {
          return [];
        });

        navigate(`/tutor/${sessionId}/admin`);
      })
      .catch((err) => console.log(err));
  };

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
          {sessionId ? (
            <div className="content__box">
              <h2>Create Poll</h2>
              <form
                className="poll__form"
                onSubmit={handleSubmit}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              >
                {}
                <div className="question">
                  <label className="input question__label" htmlFor="question">
                    Question
                  </label>
                  <input
                    className="question__input"
                    tabIndex="1"
                    onChange={questionChange}
                    type="text"
                    id="tutor__question"
                    value={question}
                  />
                </div>
                {answers.map((_, index) => {
                  return (
                    <div className="input__line " key={index}>
                      <label
                        className="input answer__line"
                        htmlFor={`answer${index + 1}`}
                      >
                        <span className="answer__label">Answer </span>{" "}
                        {index + 1}
                      </label>

                      <input
                        className="input answer__box"
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

                      <label className="container">
                        <input
                          className="checkbox"
                          onChange={(e) => {
                            handleCheckBox(e, index);
                          }}
                          type="checkbox"
                          checked={correctAnswers.includes(index)}
                        ></input>
                        <div className="checkmark"></div>
                      </label>

                      <button
                        className="delete__button"
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
                <div className="input__line">
                  <span></span>
                  <button
                    onClick={() => {
                      setAnswers(["", ""]);
                      setQuestion("");
                      setCorrectAnswers([]);
                      wipePoll();
                    }}
                    type="button"
                    className="ses__button"
                  >
                    Clear Form
                  </button>
                  <button
                    onClick={() => {
                      addAnswer();
                    }}
                    type="button"
                    className="ses__button"
                  >
                    Add answer
                  </button>
                </div>
                <div className="input__line">
                  <span></span>
                  <button
                    disabled={
                      answers.filter((answer) => answer !== "").length < 2
                    }
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <ErrorFeedback
              code={"Hey!"}
              error={"You must start a session to create a poll"}
            />
          )}
        </>
      ) : (
        <Link className="primaryButton" to="/login">
          Tutor Login
        </Link>
      )}
    </>
  );
};

export default CreatePoll;
