import "./App.css";
import StudentView from "./StudentView";
import TutorView from "./TutorView";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminView from "./AdminView";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/poll/:sesId" element={<StudentView />}></Route>
        <Route path="/tutor" element={<TutorView />}></Route>
        <Route path="/admin" element={<AdminView />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
