import React from "react";
import "./styles/Home.css";

const FourOhFour = ({ error }) => {
  return (
    <div className="contentBox">
      <h2 className="blue-1">{">"} 404</h2>

      <p>{error ?? "Nothing to see here!"}</p>
    </div>
  );
};

export default FourOhFour;
