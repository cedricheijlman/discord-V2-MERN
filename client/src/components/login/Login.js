import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";
import Axios from "axios";

function Login() {
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
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = () => {
    console.log(email, password);
    if (email && password && email !== "" && password !== "") {
      Axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      })
        .then((result) => {
          if (result.status == 200) {
            console.log(result);
            localStorage.setItem("accessKey", result.data.accessToken);
            localStorage.setItem("userId", result.data.id);
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
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
            onChange={(e) => {
              if (e.target.value !== "") {
                setPassword(e.target.value);
              }
            }}
          />
        </div>
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
