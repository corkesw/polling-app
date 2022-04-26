import React, { useEffect, useState } from "react"
import { CSSTransitionGroup, TransitionGroup } from "react-transition-group"

const AnswersAfterReveal = ({ answers, correctAnswer }) => {
  const [userAnswer, setUserAnswer] = useState("")

  useEffect(() => {
    const fetchedUserAnswer = localStorage.getItem("userAnswer")
    if (fetchedUserAnswer) {
      setUserAnswer(fetchedUserAnswer)
    }
  }, [])

  // console.log(userAnswer, "<-- user answer")

  // Conditional styling to display the correct answer after the tutor has set reveal to be true
  return (
    <TransitionGroup>
      {answers.map((answerData, index) => {
        //if answer is the correct one
        return answerData.answer === correctAnswer
          ? //if its also the users answer
            answerData.answer === userAnswer
            ? //purple to green
              console.log("user correct")
            : // if not users answer - grey to green
              console.log("im correct - user silly")
              //if incorrect answer and user selected it
          : answerData.answer === userAnswer
          ? console.log("user selected wrong")
          //if incorrect answer and ignored
          : console.log("wasnt picked and is wrong")
      })}
    </TransitionGroup>
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
