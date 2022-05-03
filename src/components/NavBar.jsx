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

  

  const changeSidebar = () => {
    setIsSidebarOpen((isOpen) => {
      return !isOpen;
    });
  };

  const logout = () => {
    signOut(auth);
	changeSidebar()
    navigate("/");
  };

  const login = () => {
	  changeSidebar()
	  navigate("/")
  }

  console.log(isSidebarOpen);

  return (
    <nav className="nav">
      <img src={logo} className="logo"></img>

      <Link className="home__link__container" to="/">
        <h1 className="grey-1 align-left home__link">Ask</h1>
      </Link>
      <>
        <div
          id="mySidebar"
          className={`sidebar sidebar__open__${isSidebarOpen}`}
        >
          {/* <button className="closebtn" onClick={changeSidebar}>
						&#9776;
					</button> */}
          {user ? <p onClick={logout}>Logout</p> : <p onClick={login}>Login</p>}
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
