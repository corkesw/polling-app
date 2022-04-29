import React, { useEffect, useState } from "react";
import "../styles/NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { slide as Menu } from "react-burger-menu";

import firebaseApp from "../firebase";

const auth = getAuth(firebaseApp);

const NavBar = () => {
	const [user, loading, error] = useAuthState(auth);
	const [innerWidth, setInnerWidth] = useState(0);

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

	const renderButtons = () => {
		if (innerWidth.width < 810) {
			return (
				<Menu width={500}>
					<Link className="nav-link" to="/tutor">
						Polls
					</Link>
					<Link className="nav-link" to="/admin">
						Admin
					</Link>
					<button className="primaryButton" onClick={logout}>
						Logout
					</button>
				</Menu>
			);
		} else {
			if (user) {
				return (
					<div>
						<Link className="nav-link" to="/tutor">
							Polls
						</Link>
						<Link className="nav-link" to="/admin">
							Admin
						</Link>
						<button className="primaryButton" onClick={logout}>
							Logout
						</button>
					</div>
				);
			} else {
				return (
					<Link className="primaryButton" to="/login">
						Tutor login
					</Link>
				);
			}
		}
	};

	return (
		<nav>
			<Link to="/">
				<h1 className="grey-1 align-left">Northcoders Polling App</h1>
			</Link>
			{renderButtons()}
		</nav>
	);
};

export default NavBar;
