import React, { useEffect, useState } from "react"
import { CSSTransitionGroup } from "react-transition-group"

const AnswersAfterReveal = ({ answers, correctAnswer, hasVoted }) => {
  // Conditional styling to display the correct answer after the tutor has set reveal to be true
  return answers.map((answerData, index) => {
    return answerData.answer === correctAnswer ? (
      <p key={index}>
        <CSSTransitionGroup
          transitionName="showCorrectAnswerTransition"
          transitionAppear={true}
          transitionEnter={true}
        >
          <button
            className="correctVoteButton"
            disabled={true}
            key={answerData.answer}
          >
            {answerData.answer}
          </button>
        </CSSTransitionGroup>
      </p>
    ) : (
      <p key={index}>
        <CSSTransitionGroup
          transitionName="showIncorrectAnswerTransition"
          transitionAppear={true}
          transitionEnter={true}
        >
          <button className="unselectedVoteButton" disabled={true}>
            {answerData.answer}
          </button>
        </CSSTransitionGroup>
      </p>
    )
  })
}

export default AnswersAfterReveal
