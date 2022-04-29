import React, { useEffect, useState } from "react"
import firebaseApp from "../../firebase"
import { getDatabase, ref, onValue, increment, set } from "firebase/database"
import { useParams } from "react-router-dom"
import "../../styles/StudentView.css"
import Answers from "./Answers.jsx"
import IsLoading from "../IsLoading"
import PieMaker from "../PieChart/PieMaker"
import ErrorFeedback from "../adminComponents/ErrorFeedback"
import colours from "../../utils/colours"

const database = getDatabase(firebaseApp)

const StudentView = () => {
  const { seshId } = useParams()
  const sessionRef = ref(database, `data/sessions/${seshId}`)

  const [question, setQuestion] = useState("")
  const [answers, setAnswers] = useState([])
  const [answerRevealed, setAnswerRevealed] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [questionId, setQuestionId] = useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [pieData, setPieData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  /*
	When realtime db updates, set the question state
	the state update will trigger the useEffect:
		- set the different state to reflect the data from new poll in the same session, including the correct answer 
		- re-enable the vote buttons so student can vote on new poll
	*/

  // setting pollData info (questions and answers)
  useEffect(() => {
    setAnswerRevealed(false)
    setUserAnswer("")
    setHasVoted(false)

    onValue(sessionRef, (snapshot) => {
      const data = snapshot.val()

      if (data) {
        const question = data.pollData.question

        const answerCollection = []
        for (const key in data.pollData.answers) {
          const answerData = data.pollData.answers[key]
          answerCollection.push(answerData)
          if (answerData.isCorrect) setCorrectAnswer(answerData.answer)
        }

        const questionId = data.pollData.question_id
        const answerRevealed = data.pollData.reveal

        setQuestion(question)
        setAnswers(answerCollection)
        setAnswerRevealed(answerRevealed)
        setQuestionId(questionId)
        setIsLoading(false)
      } else {
        setIsError(true)
        setIsLoading(false)
      }
    })
  }, [questionId])

  //colors for pie chart for student
  useEffect(() => {
    onValue(sessionRef, (snapshot) => {
      const data = snapshot.val()

      if (data) {
        setPieData(() => {
          const answers = []
          for (const key in data.pollData.answers) {
            //if the answer is correct and the answers have been revealed
            if (data.pollData.answers[key].isCorrect && answerRevealed) {
              answers.push({
                name: data.pollData.answers[key].answer,
                value: data.pollData.answers[key].votes,
                fill: "#3dd980",
              })
            } else if (data.pollData.answers[key].answer === userAnswer) {
              answers.push({
                name: data.pollData.answers[key].answer,
                value: data.pollData.answers[key].votes,
                fill: "#786be4",
              })
            } else {
              answers.push({
                name: data.pollData.answers[key].answer,
                value: data.pollData.answers[key].votes,
                fill: `${colours[key]}50`,
              })
            }
          }
          return answers
        })
      }
    })
  }, [userAnswer, answerRevealed])

  return (
    <>
      {isLoading ? (
        <IsLoading type={"cylon"} />
      ) : isError ? (
        <ErrorFeedback code={404} error="No current session" />
      ) : (
        <div id="container">
          <div id="answers">
            <h2 id="question">{question}</h2>

            <Answers
              answers={answers}
              answerRevealed={answerRevealed}
              correctAnswer={correctAnswer}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              setHasVoted={setHasVoted}
              hasVoted={hasVoted}
              database={database}
              seshId={seshId}
            />
            <PieMaker
              answers={pieData}
              revealChart={hasVoted}
              renderStudentLabel={true}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default StudentView
