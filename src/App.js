import "./styles/App.css";
import firebaseApp from "./firebase.js";
import StudentView from "./components/student/StudentView";
import Home from "./components/Home/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminView from "./components/adminComponents/AdminView";
import NavBar from "./components/NavBar";
import LoginView from "./components/adminComponents/LoginView";
import ErrorFeedback from "./components/adminComponents/ErrorFeedback";
import { useEffect, useState } from "react";
import CreatePoll from "./components/tutor/CreatePoll";
import PollAdmin from "./components/tutor/PollAdmin";

const auth = getAuth(firebaseApp);

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	const [sessionId, setSessionId] = useState("");
	const [sessionName, setSessionName] = useState("");
	const [isUser, setIsUser] = useState(false);

	useEffect(() => {
		// check if user logged in - will prompt to login in if no user
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsUser(true);
			} else {
				setIsUser(false);
			}
		});
	}, []);

	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home IsLoading={IsLoading} />}></Route>
					<Route path="/poll/:seshId" element={<StudentView />}></Route>
					<Route path="/tutor" element={<CreatePoll sessionId={sessionId} setSessionId={setSessionId} sessionName={sessionName} setSessionName={setSessionName} isUser={isUser} />}></Route>
					<Route path="/tutor/:sessionIdFromParams" element={<CreatePoll sessionId={sessionId} setSessionId={setSessionId} sessionName={sessionName} setSessionName={setSessionName} isUser={isUser} />}></Route>
					<Route path="/tutor/:sessionIdFromParams/admin" element={<PollAdmin sessionId={sessionId} setSessionId={setSessionId} sessionName={sessionName} setSessionName={setSessionName} isUser={isUser} />}></Route>
					<Route path="/login" element={<LoginView />}></Route>
					<Route path="/admin" element={<AdminView />}></Route>
					<Route path="*" element={<ErrorFeedback code={"404"} />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
