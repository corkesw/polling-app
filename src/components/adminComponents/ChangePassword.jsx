import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

const ChangePassword = ({ auth, email }) => {
  const sendPasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset link sent!");
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  return (
    <div className="contentBox align-left">
      <h2 className="blue-1">Reset your password</h2>
      <button className="primaryButton" onClick={sendPasswordReset}>
        Send email
      </button>
    </div>
  );
};

export default ChangePassword;
