//Styling
import "./styles/App.css"

//Components
import StudentView from "./components/student/StudentView"
import TutorView from "./components/tutor/TutorView"
import Home from "./components/Home/Home"
import IsLoading from "./components/IsLoading"
import AdminView from "./components/adminComponents/AdminView"
import NavBar from "./components/NavBar"
import LoginView from "./components/adminComponents/LoginView"
import ErrorFeedback from "./components/adminComponents/ErrorFeedback"

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home IsLoading={IsLoading} />}></Route>
          <Route path="/poll/:seshId" element={<StudentView />}></Route>
          <Route path="/tutor/*" element={<TutorView />}></Route>
          <Route path="/login" element={<LoginView />}></Route>
          <Route path="/admin" element={<AdminView />}></Route>
          <Route path="*" element={<ErrorFeedback code={"404"} />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
