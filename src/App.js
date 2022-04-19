import "./styles/App.css";
import StudentView from "./StudentView";
import TutorView from "./TutorView";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminView from "./AdminView";
import NavBar from "./components/NavBar";
import LoginView from "./LoginView";

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/poll/:seshId" element={<StudentView />}></Route>
					<Route path="/tutor/*" element={<TutorView />}></Route>
					<Route path="/login" element={<LoginView />}></Route>
					<Route path="/admin" element={<AdminView />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
