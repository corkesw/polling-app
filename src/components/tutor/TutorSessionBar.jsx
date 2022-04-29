import firebaseApp from "../../firebase.js"
import { getDatabase, ref, remove, set } from "firebase/database"
import "../../styles/TutorView.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { wipePoll } from "../../utils/localStorage"

const database = getDatabase(firebaseApp)

const TutorSessionBar = ({
  sessionId,
  setSessionId,
  setSessionName,
  sessionName,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (
      localStorage.getItem("sessionId") &&
      localStorage.getItem("sessionName")
    ) {
      setSessionId(localStorage.getItem("sessionId"))
      setSessionName(localStorage.getItem("sessionName"))
    }
  }, [setSessionId, setSessionName])

  const clearSession = () => {
    remove(ref(database, `data/sessions/${sessionId}`))
      .then(() => {
        setSessionId("")
        setSessionName("")
        localStorage.removeItem("sessionId")
        localStorage.removeItem("sessionName")
        wipePoll()
        navigate("/tutor")
      })
      .catch((err) => console.log(err))
  }
  const createDatabaseNodeWithSessionData = (sessionId) => {
    const path = `data/sessions/${sessionId}`
    set(ref(database, path), {
      sesData: {
        started: true,
        questionAsked: false,
        sessionName,
      },
    })
  }

  const handleSubmit = (e) => {
    const sesString = "_" + Math.random().toString(36).slice(2, 9)
    e.preventDefault()
    setSessionId(sesString)
    createDatabaseNodeWithSessionData(sesString)
    localStorage.setItem("sessionId", sesString)
    localStorage.setItem("sessionName", sessionName)
    navigate(`/tutor/${sesString}`)
  }

  const handleCopyClick = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(`localhost:3000/poll/${sessionId}`)
    } else {
      document.execCommand("copy", true, `localhost:3000/poll/${sessionId}`)
    }
  }

  return (
    <div>
      {!sessionId ? (
        <form className="session__box" onSubmit={handleSubmit}>
          <label className="input" htmlFor="sesName">
            Session Name:{" "}
          </label>
          <input
            className="input"
            onChange={(e) => {
              setSessionName(e.target.value)
            }}
            value={sessionName}
            id="sesName"
            type="text"
          ></input>
          <button>Start session</button>
        </form>
      ) : (
        <div className="session__box session__active">
          <div>
            {sessionName} :{" "}
            <span className="student__link">
              localhost:3000/poll/{sessionId}
            </span>
          </div>

          <button onClick={handleCopyClick} className="ses__button">
            Copy Link
          </button>
          <button className="ses__button" type="button" onClick={clearSession}>
            Clear session
          </button>
        </div>
      )}
    </div>
  )
}

export default TutorSessionBar
