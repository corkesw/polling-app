import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase.js";
import { getDatabase, ref, onValue, increment, set } from "firebase/database";
import { useParams } from "react-router-dom";

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

	/*
	When realtime db updates, set the question state
	the state update will trigger the useEffect:
		- set the different state to reflect the data from new poll in the same session
		- re-enable the vote buttons so student can vote on new poll
	*/
	useEffect(() => {
		setAnswerRevealed(false);
		setHasVoted(false);
		setUserAnswer("");

		onValue(sessionRef, (snapshot) => {
			const data = snapshot.val();

			const question = data.pollData.question;

			const answers = [];
			for (const key in data.pollData.answers) {
				answers.push(data.pollData.answers[key]);
			}

			const answerRevealed = data.pollData.reveal;

			setQuestion(question);
			setAnswers(answers);
			setAnswerRevealed(answerRevealed);
		});
	}, [question]);

	console.log({ userAnswer });

	const vote = ({ answer, isCorrect }, answerKey) => {
		// Set hasVoted state to disable button and stop multiple votes on same question
		setHasVoted(true);

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

					{answers.map((answer, index) => {
						return answer.answer === userAnswer ? (
							<p key={index}>
								<button
									className="testCorrectAnswer"
									disabled={hasVoted}
									onClick={() => {
										vote(answer, index);
									}}
								>
									{answer.answer}
								</button>
							</p>
						) : (
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
