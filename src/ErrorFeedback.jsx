import React from "react";
import "./styles/Home.css";

const ErrorFeedback = ({ error, code }) => {
  return (
    <div className="contentBox">
      <h2 className="blue-1">{">"}{code}</h2>

      <p>{error ?? "Nothing to see here!"}</p>
    </div>
  );
};

export default ErrorFeedback;
