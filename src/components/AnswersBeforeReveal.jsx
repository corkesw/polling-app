import React from "react";

const AnswersBeforeReveal = ({ answers, userAnswer, hasVoted, vote }) => {
	// Conditional rendering to apply specific className to the user's selected button
	return answers.map((answer, index) => {
		return answer.answer === userAnswer ? (
			<p key={index}>
				<button
					className="selectedVoteButton"
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
					className={userAnswer ? "unselectedVoteButton" : "voteButton"}
					disabled={hasVoted}
					onClick={() => {
						vote(answer, index);
					}}
				>
					{answer.answer}
				</button>
			</p>
		);
	});
};

export default AnswersBeforeReveal;
