import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import firebaseApp from "../src/firebase";
import { getAuth } from "firebase/auth";
import ChangePassword from "./components/ChangePassword";

const auth = getAuth(firebaseApp);

const AdminView = () => {
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      setPageLoading(true);
    } else if (user === null) {
      navigate("/");
    }
  }, [user, loading]);

  if (pageLoading) {
    return <p>loading</p>;
  } else {
    return (
      <div>
        <div className="contentBox align-left">
          <h2 className="blue-1">Admin</h2>
          <h3 className="grey-2">You are logged in as: {user.email}</h3>
        </div>
        <ChangePassword auth={auth} email={user.email} />
      </div>
    );
  }
};

export default AdminView;
