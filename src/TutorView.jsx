import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";

const database = getDatabase(firebaseApp);

const TutorView = () => {
  const [sesId, setSesId] = useState(null);
  const [votesCast, setVotesCast] = useState(0);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [pollData, setPollData] = useState({
    answers: [],
    correctAnswer: null,
    question: null,
    reveal: false,
  });

  // console.log(question);

  const questionChange = (e) => {
    setQuestion(e.target.value);
  };

  const answerChange = (e, index) => {
    setAnswers((currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers[index] = e.target.value;
      return updatedAnswers;
    });
  };

  const addAnswer = (index) => {
    console.log(index);
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

  const removeAnswer = (index) => {
    console.log(index);
    setAnswers((currentAnswers) => {
      const updatedAnswers = currentAnswers.filter((answer, i) => {
        return index !== i;
      });
      return updatedAnswers;
    });
  };

  console.log(answers);

  const pollChange = (e, questionNumber) => {
    setPollData((currentValue) => {
      currentValue.answers[questionNumber] = e.target.value;
    });
  };

  useEffect(() => {
    onValue(ref(database, `${sesId}/answers/__votesCast__`), (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      if (!data) setVotesCast(0);
      else setVotesCast(data.votes);
    });
  }, [sesId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionSet = e.target[0].value;
    const answer1 = e.target[1].value;
    const answer2 = e.target[2].value;
    const answer3 = e.target[3].value;
    set(ref(database, `${sesId}`), {
      question: questionSet,
      answers: {
        [answer1]: { votes: 0 },
        [answer2]: { votes: 0 },
        [answer3]: { votes: 0 },
        __votesCast__: { votes: 0 },
      },
    });
  };
  const clearSession = () => {
    remove(ref(database, `${sesId}`));
    setSesId(null);
  };
  return (
    <div>
      <hr></hr>
      {!sesId ? (
        <button
          onClick={() => {
            setSesId("_" + Math.random().toString(36).substr(2, 9));
          }}
        >
          Start session
        </button>
      ) : (
        <div>
          <p>session link : localhost:3000/poll/{sesId}</p>
          <button onClick={clearSession}>Clear session</button>
        </div>
      )}
      <p>Tutor View!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
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

      <p>Votes Cast: {votesCast}</p>
    </div>
  );
};

export default TutorView;
