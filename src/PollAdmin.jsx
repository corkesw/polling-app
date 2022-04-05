import { get, getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import firebaseApp from "./firebase";

const database = getDatabase(firebaseApp);

const PollAdmin = ({ sessionId }) => {
  useEffect(() => {
    const path = `data/sessions/${sessionId}/pollData`;
    console.log(path)
    onValue(ref(database, path), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  });

  return <div>bananana!</div>;
};

export default PollAdmin;
