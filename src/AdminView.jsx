import React, { useEffect, useState } from "react";
import RegisterUser from "./components/RegisterUser";
import { useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import firebaseApp from "../src/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

const AdminView = () => {
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      setPageLoading(true);
    } else if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div>
      <h2>Admin page!</h2>
      <RegisterUser auth={auth} />
    </div>
  );
};

export default AdminView;
