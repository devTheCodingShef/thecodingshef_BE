// src/pages/Main.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const [loggedInUser, setLoggedInUser] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        backgroundColor: "#ADD8E6",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>Hello! Welcome to dashboard {loggedInUser}</h1>
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
}

export default Main;
