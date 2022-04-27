;<button
  key={index}
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
          : "userIgnoredAndWrong"
        : //if there is no user answer - standard vote button
          "voteButton"
      : // IF ANSWER HAS NOT BEEN REVEALED
      userAnswer
      ? //if answer is users chosen answer
        userAnswer === answerData.answer
        ? "selectedVoteButton"
        : "unselectedVoteButton"
      : "voteButton"
  }
  disabled={hasVoted}
  onClick={(e) => {
    setUserAnswer(() => e.target.innerText)
    setHasVoted(true)
    vote(answerData, index)
  }}
>
  {answerData.answer}
</button>
