import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, onValue, increment, set } from "firebase/database";
import { useParams } from "react-router-dom";

const database = getDatabase(firebaseApp);

const StudentView = () => {
	const { sesId } = useParams();
	const sessionRef = ref(database, `data/sessions/${sesId}`);

	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState([]);
	const [votesCast, setVotesCast] = useState({});
	const [hasVoted, setHasVoted] = useState(false);
	const [correctCount, setCorrectCount] = useState(0);
	const [answerRevealed, setAnswerRevealed] = useState(false);

	/*
	When realtime db updates, set the question state
	the state update will trigger the useEffect:
		- set the different state to reflect the data from new poll in the same session
		- re-enable the vote buttons so student can vote on new poll
	*/
	useEffect(() => {
		setAnswerRevealed(false);
		setHasVoted(false);

		onValue(sessionRef, (snapshot) => {
			const data = snapshot.val();

			const question = data.pollData.question;

			const answers = [];
			for (const key in data.pollData.answers) {
				answers.push(data.pollData.answers[key]);
			}

			const votesCast = data.pollData.votesCast;

			const answerRevealed = data.pollData.reveal;

			setQuestion(question);
			setAnswers(answers);
			setVotesCast(votesCast);
			setAnswerRevealed(answerRevealed);
		});
	}, [sesId, question]);

	const vote = ({ answer, isCorrect }, answerKey) => {
		// Set hasVoted state to disable button and stop multiple votes on same question
		setHasVoted(true);

		// Increment the answer vote in db
		set(ref(database, `data/sessions/${sesId}/pollData/answers/${answerKey}`), {
			answer,
			isCorrect,
			votes: increment(1),
		});

		// Increment the total amount of votes in db
		set(ref(database, `data/sessions/${sesId}/pollData/votesCast`), {
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

					{answers.map((answer, index) => {
						return (
							<p key={index}>
								<button
									disabled={hasVoted}
									onClick={() => {
										vote(answer, index);
									}}
								>
									{answer.answer}
								</button>
							</p>
						);
					})}
					<p>Total amount of votes: {votesCast.votes}</p>
					{answerRevealed ? (
						<div>
							<p>Correct Answer Total: {correctCount}</p>
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);
};

export default StudentView;
