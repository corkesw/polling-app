import "./styles/App.css";
import StudentView from "./StudentView";
import TutorView from "./TutorView";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminView from "./AdminView";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/poll/:sesId" element={<StudentView />}></Route>
          <Route path="/tutor" element={<TutorView />}></Route>
          <Route path="/admin" element={<AdminView />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
