const duration = 1000

//if user selected correct answer
const correctAnswerDefaultStyles = {
  width: "350px",
  backgroundColor: "#786be4",
  padding: "0.5em 1em",
  margin: "0.2rem",
  display: "inline-block",
  textDecoration: "none",
  color: "#ffffff",
  fontFamily: "Mark Pro Medium",
  fontSize: "1.2rem",
  letterSpacing: "0.35px",
  cursor: "pointer",
  transition: `backgroundColor ${duration}ms ease-in-out`,
}

const userCorrectStyles = {
  entering: { backgroundColor: "#786be4" },
  entered: { backgroundColor: "#3dd980" },
}

//if user didn't select but answer is correct
const correctAnswerNotSelectedDefaultStyles = {
  width: "350px",
  backgroundColor: "#888888",
  padding: "0.5em 1em",
  opacity: "0.4",
  margin: "0.2rem",
  display: "inline-block",
  textDecoration: "none",
  color: "#ffffff",
  fontFamily: "Mark Pro Medium",
  fontSize: "1.2rem",
  letterSpacing: "0.35px",
  cursor: "pointer",
  transition: `backgroundColor ${duration}ms ease-in-out`,
}

const correctAnswerNotSelectedStyles = {
  entering: { opacity: "0.4", backgroundColor: "#888888" },
  entered: { opacity: "1", backgroundColor: "#3dd980" },
}

//if user did select but answer is inCorrect
const incorrectAnswerSelectedDefaultStyles = {
  width: "350px",
  backgroundColor: "#786be4",
  padding: "0.5em 1em",
  margin: "0.2rem",
  opacity: "1",
  display: "inline-block",
  textDecoration: "none",
  color: "#ffffff",
  fontFamily: "Mark Pro Medium",
  fontSize: "1.2rem",
  letterSpacing: "0.35px",
  cursor: "pointer",
  transition: `backgroundColor ${duration}ms ease-in-out`,
}

const incorrectAnswerSelectedStyles = {
  entering: { opacity: "1", backgroundColor: "#786be4" },
  entered: { opacity: "0.4", backgroundColor: "red" },
}

//if user did not select and answer is inCorrect
const incorrectAnswerNotSelectedDefaultStyles = {
  width: "350px",
  backgroundColor: "#888888",
  padding: "0.5em 1em",
  margin: "0.2rem",
  display: "inline-block",
  textDecoration: "none",
  color: "#ffffff",
  fontFamily: "Mark Pro Medium",
  fontSize: "1.2rem",
  letterSpacing: "0.35px",
  cursor: "pointer",
  opacity: "0.4",
  transition: `backgroundColor ${duration}ms ease-in-out`,
}

const incorrectAnswerNotSelectedStyles = {
  entering: { opacity: "0.4", backgroundColor: "#888888" },
  entered: { opacity: "0.4", backgroundColor: "#888888" },
}

export {
  userCorrectStyles,
  correctAnswerDefaultStyles,
  correctAnswerNotSelectedDefaultStyles,
  correctAnswerNotSelectedStyles,
  incorrectAnswerSelectedDefaultStyles,
  incorrectAnswerSelectedStyles,
  incorrectAnswerNotSelectedDefaultStyles,
  incorrectAnswerNotSelectedStyles,
}
