import { Database, increment, ref, set } from "firebase/database";
import React, { useState } from "react";
import colours from "../../utils/colours";

const Answers = ({ answers, correctAnswer, answerRevealed, userAnswer, setUserAnswer, hasVoted, setHasVoted, database, seshId }) => {
	// state for storing users selected answer

	//VOTE FUNCTION
	const vote = ({ answer, isCorrect }, answerKey) => {
		// Set hasVoted state to disable button and stop multiple votes on same question
		// setHasVoted(true)
		// // Set the userAnswer state to the selectedAnswer
		// setUserAnswer(() => {
		//   return answer
		// })
		// // Store userAnswer in localStorage
		// localStorage.setItem("userAnswer", answer)
		// // Increment the answer vote in db

		set(ref(database, `data/sessions/${seshId}/pollData/answers/${answerKey}`), {
			answer,
			isCorrect,
			votes: increment(1),
		});
	};

	return (
		<div id="answersList">
			{answers.map((answerData, index) => {
				return (
					<button
						key={index}
						style={userAnswer ? { backgroundColor: `${colours[index]}4e` } : null}
						className={
							//has the answer been revealed?
							answerRevealed
								? userAnswer
									? //is user answer same as current answer?
									  userAnswer === answerData.answer
										? // if so, is it the correct answer?
										  userAnswer === correctAnswer
											? "userCorrect"
											: "userIncorrect"
										: //is not selected answer correct?
										answerData.answer === correctAnswer
										? "userWrongButAnswerCorrect"
										: "unselectedVoteButton"
									: //if there is no user answer - standard vote button
									  "voteButton"
								: // IF ANSWER HAS NOT BEEN REVEALED
								userAnswer
								? //if answer is users chosen answer
								  userAnswer === answerData.answer
									? "selectedVoteButton"
									: "unselectedVoteButton"
								: // if user has not selected an answer
								  "voteButton"
						}
						disabled={hasVoted}
						onClick={(e) => {
							setUserAnswer(() => e.target.innerText);
							setHasVoted(true);
							vote(answerData, index);
						}}
					>
						{answerData.answer}
					</button>
				);
			})}
		</div>
	);
};

export default Answers;

{
	/* <p key={index}>
        <button
          className="selectedVoteButton"
          disabled={hasVoted}
          onClick={() => {
            vote(answerData, index)
          }}
        >
          {answerData.answer}
        </button>
      </p> */
}
