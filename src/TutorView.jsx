import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";

const database = getDatabase(firebaseApp);

const TutorView = () => {
  const [sesId, setSesId] = useState(null);
  const [votesCast, setVotesCast] = useState(0);
  console.log(votesCast);
  useEffect(() => {
    onValue(ref(database, `${sesId}/answers/__votesCast__`), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
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
        <label htmlFor="question">Question</label>
        <input type="text" id="question"></input>
        <label htmlFor="answer1">Answer 1</label>
        <input type="text" id="answer1"></input>
        <label htmlFor="answer2">Answer 2</label>
        <input type="text" id="answer2"></input>
        <label htmlFor="answer3">Answer 3</label>
        <input type="text" id="answer3"></input>
        <button>Submit</button>
      </form>

      <p>Votes Cast: {votesCast}</p>
    </div>
  );
};

export default TutorView;
