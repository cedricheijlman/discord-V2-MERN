import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";
import Axios from "axios";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  // check if user already logged in
  useEffect(() => {
    if (localStorage.getItem("accessKey")) {
      Axios.post(`${process.env.REACT_APP_HOST}validateUser`, {
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
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // handle login
  const handleLogin = () => {
    if (email && password && email !== "" && password !== "") {
      Axios.post(`${process.env.REACT_APP_HOST}login`, {
        email: email,
        password: password,
      })
        .then((result) => {
          if (result.data.message == "Logged In") {
            localStorage.setItem("accessKey", result.data.accessToken);
            localStorage.setItem("userId", result.data.id);
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          }

          if (result.data.message == "Invalid Email or Password") {
            setErrorMessage(result.data.message);
          }
        })
        .catch((err) => {
          window.location.reload();
        });
    }
  };

  return (
    <div id="login">
      <div className="loginBox">
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <h2>Welcome Back!</h2>
          <p>We're happy to see you back!</p>
        </div>
        <div className="inputDiv">
          <span>Email</span>
          <input
            onChange={(e) => {
              if (e.target.value !== "") {
                setEmail(e.target.value);
              }
            }}
          />
        </div>
        <div className="inputDiv">
          <span>Password</span>
          <input
            type="password"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleLogin();
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
          Don't have an account?{" "}
          <span>
            <Link to="/register">Register</Link>
          </span>
        </p>

        <button onClick={handleLogin}>Log in</button>
      </div>
    </div>
  );
}

export default Login;
