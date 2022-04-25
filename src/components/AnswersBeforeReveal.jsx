import React from "react";

const AnswersBeforeReveal = ({ answers, userAnswer, hasVoted, vote }) => {
	// Conditional rendering to apply specific className to the user's selected button
	return answers.map((answerData, index) => {
		return answerData.answer === userAnswer ? (
			<p key={index}>
				<button
					className="selectedVoteButton"
					disabled={hasVoted}
					onClick={() => {
						vote(answerData, index);
					}}
				>
					{answerData.answer}
				</button>
			</p>
		) : (
			<p key={index}>
				<button
					className={userAnswer ? "unselectedVoteButton" : "voteButton"}
					disabled={hasVoted}
					onClick={() => {
						vote(answerData, index);
					}}
				>
					{answerData.answer}
				</button>
			</p>
		);
	});
};

export default AnswersBeforeReveal;
