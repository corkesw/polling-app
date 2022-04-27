
import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, onValue, increment, set } from "firebase/database";
import { useParams } from "react-router-dom";
import "./styles/StudentView.css";
import Answers from "./components/Answers.jsx";

const database = getDatabase(firebaseApp)

const StudentView = () => {
  const { seshId } = useParams()
  const sessionRef = ref(database, `data/sessions/${seshId}`)


	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState([]);
	const [answerRevealed, setAnswerRevealed] = useState(false);
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [questionId, setQuestionId] = useState("");
	const [userAnswer, setUserAnswer] = useState("");
	const [hasVoted, setHasVoted] = useState(false);

  /*
	When realtime db updates, set the question state
	the state update will trigger the useEffect:
		- set the different state to reflect the data from new poll in the same session, including the correct answer 
		- re-enable the vote buttons so student can vote on new poll
	*/

	useEffect(() => {
		setAnswerRevealed(false);
		setUserAnswer("");
		setHasVoted(false);


    onValue(sessionRef, (snapshot) => {
      const data = snapshot.val()

      const question = data.pollData.question

      const answerCollection = []
      for (const key in data.pollData.answers) {
        const answerData = data.pollData.answers[key]
        answerCollection.push(answerData)
        if (answerData.isCorrect) setCorrectAnswer(answerData.answer)
      }

			const questionId = data.pollData.question_id;
			const answerRevealed = data.pollData.reveal;

			setQuestion(question);
			setAnswers(answerCollection);
			setAnswerRevealed(answerRevealed);
			setQuestionId(questionId);
		});
	}, [questionId]);

	return (
		<div id="container">
			{/* {question && answers ? ( */}
			<div>
				<h2 id="question">{question}</h2>

				<Answers answers={answers} answerRevealed={answerRevealed} correctAnswer={correctAnswer} userAnswer={userAnswer} setUserAnswer={setUserAnswer} setHasVoted={setHasVoted} hasVoted={hasVoted} />
			</div>
		</div>
	);
};

export default StudentView;
