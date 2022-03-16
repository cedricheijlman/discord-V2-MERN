import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // check if user already logged in
  useEffect(() => {
    if (localStorage.getItem("accessKey")) {
      Axios.post("http://localhost:3001/validateUser", {
        accessTokenKey: localStorage.getItem("accessKey"),
      })
        .then((result) => {
          if (result.status == 200) {
            window.location.pathname = "/me/friends";
          } else {
            localStorage.removeItem("accessKey");
          }
        })
        .catch(() => {
          localStorage.removeItem("accessKey");
        });
    }
  }, []);

  let navigate = useNavigate();

  const handleRegister = () => {
    if (
      email &&
      password &&
      username &&
      email !== "" &&
      password !== "" &&
      username !== ""
    ) {
      Axios.post("http://localhost:3001/register", {
        email,
        password,
        username,
      })
        .then(async (result) => {
          if (result.status == 201) {
            localStorage.setItem("accessKey", result.data.accessToken);
            localStorage.setItem("userId", result.data.id);
            navigate("/dashboard");
          }

          if (result.status == 200) {
            setErrorMessage(result.data.message);
          }
        })
        .catch(() => {
          window.location.reload();
        });
    }
  };

  return (
    <div id="register">
      <div className="loginBox">
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <h2>Make an account</h2>
        </div>
        <div className="inputDiv">
          <span>Email</span>
          <input
            type="email"
            onChange={(e) => {
              if (e.target.value !== "") {
                setEmail(e.target.value);
              }
            }}
          />
        </div>
        <div className="inputDiv">
          <span>Username</span>
          <input
            onChange={(e) => {
              if (e.target.value !== "") {
                setUsername(e.target.value);
              }
            }}
          />
        </div>
        <div className="inputDiv">
          <span>Password</span>
          <input
            type={"password"}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleRegister();
              }
            }}
            onChange={(e) => {
              if (e.target.value !== "") {
                setPassword(e.target.value);
              }
            }}
          />
        </div>
        <p style={{ marginBottom: 10, color: "red" }}>{errorMessage}</p>
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
        <button onClick={handleRegister}>Register Account</button>
      </div>
    </div>
  );
}

export default Register;
