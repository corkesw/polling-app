import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, onValue, increment, set } from "firebase/database";
import { useParams } from "react-router-dom";

const database = getDatabase(firebaseApp);

const StudentView = () => {
  const { sesId } = useParams();
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
 
  useEffect(() => {
    const question = ref(database, sesId);
    onValue(question, (snapshot) => {
      const data = snapshot.val();
      const question = data.question;
      const answers = Object.keys(data.answers).filter(
        (item) => item !== "__votesCast__"
      );
      setQuestion(question);
      setAnswers(answers);
    });
  }, []);

  const vote = (answer) => {
    const voteRef = `${sesId}/answers/${answer}`;
    set(ref(database, voteRef), {
      votes: increment(1),
    });
    set(ref(database, `${sesId}/answers/__votesCast__`), {
      votes: increment(1),
    });
  };

  return (
    <div>
      <p>Student View!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
      {question && answers ? (
        <div>
          <p>{question}</p>

          {answers.map((answer) => {
            return (
              <p>
                <button
                  onClick={() => {
                    vote(answer);
                  }}
                >
                  {answer}
                </button>
              </p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default StudentView;
