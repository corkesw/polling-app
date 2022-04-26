import React, { useEffect, useState } from "react"

import { Transition } from "react-transition-group"

import {
  userCorrectStyles,
  correctAnswerDefaultStyles,
  correctAnswerNotSelectedDefaultStyles,
  correctAnswerNotSelectedStyles,
  incorrectAnswerSelectedDefaultStyles,
  incorrectAnswerSelectedStyles,
  incorrectAnswerNotSelectedDefaultStyles,
  incorrectAnswerNotSelectedStyles,
} from "../styles/TransitionStyles"

const AnswersAfterReveal = ({ answers, correctAnswer }) => {
  const [userAnswer, setUserAnswer] = useState("")
  const [receivedAnswer, setReceivedAnswer] = useState(false)

  // Conditional styling to display the correct answer after the tutor has set reveal to be true

  useEffect(() => {
    const something = localStorage.getItem("userAnswer")

    setUserAnswer(something)
  }, [])

  console.log(receivedAnswer, "<-- received answer")
  return (
    <>
      {answers.map((answerData, index) => {
        //if answer is the correct one
        return answerData.answer === correctAnswer ? (
          //if its also the users answer
          answerData.answer === userAnswer ? (
            //purple to green
            <Transition in={receivedAnswer} key={index} timeout={1000}>
              {(state) => (
                <button
                  style={{
                    ...correctAnswerDefaultStyles,
                    ...userCorrectStyles[state],
                  }}
                >
                  {answerData.answer}
                </button>
              )}
            </Transition>
          ) : (
            // if not users answer - grey to green
            <Transition in={receivedAnswer} key={index} timeout={1000}>
              {(state) => (
                <button
                  style={{
                    ...correctAnswerNotSelectedDefaultStyles,
                    ...correctAnswerNotSelectedStyles[state],
                  }}
                >
                  {answerData.answer}
                </button>
              )}
            </Transition>
          )
        ) : //if incorrect answer and user selected it
        answerData.answer === userAnswer ? (
          <Transition in={receivedAnswer} key={index} timeout={1000}>
            {(state) => (
              <button
                style={{
                  ...incorrectAnswerSelectedDefaultStyles,
                  ...incorrectAnswerSelectedStyles[state],
                }}
              >
                {answerData.answer}
              </button>
            )}
          </Transition>
        ) : (
          //if incorrect answer and ignored
          <Transition in={receivedAnswer} key={index} timeout={1000}>
            {(state) => (
              <button
                style={{
                  ...incorrectAnswerNotSelectedDefaultStyles,
                  ...incorrectAnswerNotSelectedStyles[state],
                }}
              >
                {answerData.answer}
              </button>
            )}
          </Transition>
        )
      })}

      <button
        onClick={() => setReceivedAnswer(true)}
        style={{ display: "block" }}
      >
        make true
      </button>
    </>
  )
}
export default AnswersAfterReveal

{
  /* (answers.map((answerData, index) => {
    //if correct answer is what user has selected
    return correctAnswer === userAnswer ? (
      answerData.answer === correctAnswer ? (
        <p key={index}>
          <CSSTransitionGroup
            transitionName="showCorrectAnswerTransition"
            transitionAppear={true}
            transitionEnter={false}
            transitionLeave={false}
            transitionAppearTimeout={500}
            // transitionEnterTimeout={500}
            // transitionLeaveTimeout={500}
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
            transitionName={"showIncorrectAnswerNotChosenTransition"}
            transitionAppear={true}
            transitionEnter={false}
            transitionLeave={false}
            transitionAppearTimeout={500}
            // transitionEnterTimeout={500}
            // transitionLeaveTimeout={500}
          >
            <button className={"unselectedVoteButton"} disabled={true}>
              {answerData.answer}
            </button>
          </CSSTransitionGroup>
        </p>
      )
    ) : // IF USER DID NOT SELECT RIGHT ANSWER
    answerData.answer === correctAnswer ? (
      <p key={index}>
        <CSSTransitionGroup
          transitionName={"correctNotChosenAnswerTransition"}
          transitionAppear={true}
          transitionEnter={false}
          transitionLeave={false}
          transitionAppearTimeout={500}
          // transitionEnterTimeout={500}
          // transitionLeaveTimeout={500}
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
          transitionName={
            answerData.answer === userAnswer
              ? "showIncorrectAnswerButChosenTransition"
              : "showIncorrectAnswerNotChosenTransition"
          }
          transitionAppear={true}
          transitionEnter={false}
          transitionLeave={false}
          transitionAppearTimeout={100}
          // transitionEnterTimeout={500}
          // transitionLeaveTimeout={500}
        >
          <button className={"unselectedVoteButton"} disabled={true}>
            {answerData.answer}
          </button>
        </CSSTransitionGroup>
      </p>
    )
  }) */
}
