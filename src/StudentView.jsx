import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, onValue, increment, set } from "firebase/database";
import { useParams } from "react-router-dom";
import "./styles/StudentView.css";
import AnswersBeforeReveal from "./components/AnswersBeforeReveal.jsx";
import AnswersAfterReveal from "./components/AnswersAfterReveal.jsx";

const database = getDatabase(firebaseApp);

const StudentView = () => {
	const { seshId } = useParams();
	const sessionRef = ref(database, `data/sessions/${seshId}`);

	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState([]);
	const [hasVoted, setHasVoted] = useState(false);
	const [correctCount, setCorrectCount] = useState(0);
	const [answerRevealed, setAnswerRevealed] = useState(false);
	const [userAnswer, setUserAnswer] = useState("");
	const [correctAnswer, setCorrectAnswer] = useState("");

	/*
	When realtime db updates, set the question state
	the state update will trigger the useEffect:
		- set the different state to reflect the data from new poll in the same session, including the correct answer 
		- re-enable the vote buttons so student can vote on new poll
	*/
	useEffect(() => {
		setAnswerRevealed(false);
		setHasVoted(false);
		setUserAnswer("");

		onValue(sessionRef, (snapshot) => {
			const data = snapshot.val();

			const question = data.pollData.question;

			const answerCollection = [];
			for (const key in data.pollData.answers) {
				const answerData = data.pollData.answers[key];
				answerCollection.push(answerData);
				if (answerData.isCorrect) setCorrectAnswer(answerData.answer);
			}

			const answerRevealed = data.pollData.reveal;

			setQuestion(question);
			setAnswers(answerCollection);
			setAnswerRevealed(answerRevealed);
		});
	}, [question]);

	const vote = ({ answer, isCorrect }, answerKey) => {
		// Set hasVoted state to disable button and stop multiple votes on same question
		setHasVoted(true);

		// Set the userAnswer state to the selectedAnswer
		setUserAnswer(() => {
			return answer;
		});

		// Increment the answer vote in db
		set(ref(database, `data/sessions/${seshId}/pollData/answers/${answerKey}`), {
			answer,
			isCorrect,
			votes: increment(1),
		});

		// Keep a tally of how many questions have been answered correctly
		if (isCorrect) {
			setCorrectCount((currentCount) => {
				return (currentCount += 1);
			});
		}
	};

	return (
		<div>
			<p>Student View!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
			{question && answers ? (
				<div>
					<p>{question}</p>
					{/* Render different answers component if reveal in db is true or false */}
					{!answerRevealed ? (
						<AnswersBeforeReveal answers={answers} userAnswer={userAnswer} answerRevealed={answerRevealed} hasVoted={hasVoted} vote={vote} />
					) : (
						<AnswersAfterReveal answers={answers} correctAnswer={correctAnswer} answerRevealed={answerRevealed} hasVoted={hasVoted} vote={vote} />
					)}
				</div>
			) : null}
			{/* Reset userAnswer and hasVoted for testing only */}
			<button
				className="resetButton"
				value={"reset"}
				onClick={() => {
					setUserAnswer("");
					setHasVoted(false);
				}}
			>
				RESET ANSWER
			</button>
		</div>
	);
};

export default StudentView;
