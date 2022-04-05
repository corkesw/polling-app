import React, { useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, set } from "firebase/database";

const database = getDatabase(firebaseApp);

const CreatePoll = ({ sesId }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [pollData, setPollData] = useState({
    answers: [],
    correctAnswer: null,
    question: null,
    reveal: false,
  });

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
    const updater = (currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers.push("");
      return updatedAnswers;
    };
    if (index === answers.length - 1) {
      setAnswers(updater);
    }
    if (index === undefined) {
      setAnswers(updater);
    }
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

  //   useEffect(() => {
  //     onValue(ref(database, `${sesId}/answers/__votesCast__`), (snapshot) => {
  //       const data = snapshot.val();
  //       // console.log(data);
  //       if (!data) setVotesCast(0);
  //       else setVotesCast(data.votes);
  //     });
  //   }, [sesId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    set(ref(database, `${sesId}`), {
      question,
      answers: {},
    });
    setPollData();
  };

  return (
    <div>
      <p>Tutor View!!!!!!!!!!!!!!!!</p>
      <form onSubmit={handleSubmit}>
        {}
        <label htmlFor="question">Question</label>
        <input onChange={questionChange} type="text" id="question"></input>
        {answers.map((answer, index) => {
          return (
            <div key={index}>
              <label htmlFor={`answer${index + 1}`}>Answer {index + 1}</label>
              <input
                onBlur={() => {
                  addAnswer(index);
                }}
                onChange={(e) => {
                  answerChange(e, index);
                }}
                type="text"
                id="answer1"
                value={answers[index]}
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
        <div>
          <button
            onClick={() => {
              addAnswer();
            }}
            type="button"
          >
            Add answer
          </button>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreatePoll;
