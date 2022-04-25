import React from "react";

const AnswersAfterReveal = ({ answers, correctAnswer, hasVoted }) => {
	// Conditional styling to display the correct answer after the tutor has set reveal to be true
	return answers.map((answerData, index) => {
		return answerData.answer === correctAnswer ? (
			<p key={index}>
				<button className="correctVoteButton" disabled={hasVoted}>
					{answerData.answer}
				</button>
			</p>
		) : (
			<p key={index}>
				<button className="incorrectVoteButton" disabled={hasVoted}>
					{answerData.answer}
				</button>
			</p>
		);
	});
};

export default AnswersAfterReveal;
