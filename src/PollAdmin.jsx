import { get, getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import firebaseApp from "./firebase";

const database = getDatabase(firebaseApp);

const PollAdmin = ({ sessionId }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);

  console.log(answers);
  useEffect(() => {
    const path = `data/sessions/${sessionId}/pollData`;
    console.log(path);
    onValue(ref(database, path), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setQuestion(data.question);
      setAnswers(() => {
        const answers = [];
        for (const key in data.answers) {
          console.log();
          answers.push([
            key,
            data.answers[key].answer,
            data.answers[key].isCorrect,
            data.answers[key].votes,
          ]);
        }
        return answers;
      });
    });
  }, []);

  return <div>bananana!</div>;
};

export default PollAdmin;
