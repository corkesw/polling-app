import React from "react";

const AnswersAfterReveal = ({ answers, correctAnswer, hasVoted }) => {
	// Conditional styling to display the correct answer after the tutor has set reveal to be true
	return answers.map((answer, index) => {
		return answer.answer === correctAnswer ? (
			<p key={index}>
				<button className="correctVoteButton" disabled={hasVoted}>
					{answer.answer}
				</button>
			</p>
		) : (
			<p key={index}>
				<button className="incorrectVoteButton" disabled={hasVoted}>
					{answer.answer}
				</button>
			</p>
		);
	});
};

export default AnswersAfterReveal;
