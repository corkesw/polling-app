import React, { useEffect, useState } from "react";
import "../styles/NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../images/tertiary-logo.png";

import firebaseApp from "../firebase";

const auth = getAuth(firebaseApp);

const NavBar = () => {
	const [user, loading, error] = useAuthState(auth);
	const [innerWidth, setInnerWidth] = useState(0);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const getWindowDimensions = () => {
		const { innerWidth: width } = window;
		return { width };
	};

	useEffect(() => {
		const handleResize = () => {
			setInnerWidth(getWindowDimensions());
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const navigate = useNavigate();

	const logout = () => {
		signOut(auth);
		navigate("/");
	};

	const changeSidebar = () => {
		setIsSidebarOpen((isOpen) => {
			return !isOpen;
		});
	};

	console.log(isSidebarOpen);

	// const renderButtons = () => {
	// 	return (
	// 		// <>
	// 		// 	<div id="mySidebar" className={`sidebar sidebar__open__${isSidebarOpen}`}>
	// 		// 		<button className="closebtn" onClick={changeSidebar}>
	// 		// 			&#9776;
	// 		// 		</button>
	// 		// 		<a href="#">Logout</a>
	// 		// 	</div>
	// 		// 	<div id="main">
	// 		// 		<button className="openbtn" onClick={changeSidebar}>
	// 		// 			&#9776;
	// 		// 		</button>
	// 		// 		{/* <h2>Collapsed Sidebar</h2>
	// 		// 			<p>Content...</p> */}
	// 		// 	</div>
	// 		// </>
	// 	// );
	// 	// } else {
	// 	// 	if (user) {
	// 	// 		return (
	// 	// 			<div>
	// 	// 				<Link className="nav-link" to="/tutor">
	// 	// 					Polls
	// 	// 				</Link>
	// 	// 				<Link className="nav-link" to="/admin">
	// 	// 					Admin
	// 	// 				</Link>
	// 	// 				<button className="primaryButton" onClick={logout}>
	// 	// 					Logout
	// 	// 				</button>
	// 	// 			</div>
	// 	// 		);
	// 	// 	} else {
	// 	// 		return (
	// 	// 			<Link className="primaryButton" to="/login">
	// 	// 				Tutor login
	// 	// 			</Link>
	// 	// 		);
	// 	// 	}
	// 	// }
	// // };

	return (
		<nav className="nav">
			<img src={logo} className="logo"></img>

			<Link className="home__link__container" to="/">
				<h1 className="grey-1 align-left home__link">Ask</h1>
			</Link>
			<>
				<div id="mySidebar" className={`sidebar sidebar__open__${isSidebarOpen}`}>
					{/* <button className="closebtn" onClick={changeSidebar}>
						&#9776;
					</button> */}
					<a href="#">Logout</a>
				</div>
				<div id="main">
					<button className="openbtn" onClick={changeSidebar}>
						&#9776;
					</button>
					{/* <h2>Collapsed Sidebar</h2>
						<p>Content...</p> */}
				</div>
			</>
		</nav>
	);
};

export default NavBar;
