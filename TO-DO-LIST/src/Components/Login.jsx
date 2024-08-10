import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: { error: false, message: "" },
    password: { error: false },
  });
  const navigate = useNavigate();
  const HandleSubmit = (e) => {
    e.preventDefault();
    const regExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (regExp.test(password)) {
      // console.log("valid");
    } else {
      // console.log("not valid");
    }
    axios
      .post("http://localhost:3001/login", { email, password })
      // .then(console.log("hi"))
      .then((res) => {
        setError((prestate) => ({ ...prestate, password: { error: false } }));
        setError((prestate) => ({ ...prestate, email: { error: false } }));
        // console.log(res);
        if (res.data[0] == "exit") {
          // console.log("sucess");
          if (password === res.data[2]) {
            // console.log("correct");
            localStorage.setItem("id", res.data[1]);
            navigate("/home");
            setError((prestate) => ({
              ...prestate,
              password: { error: false },
            }));
          } else {
            setError((prestate) => ({
              ...prestate,
              password: { error: true },
            }));
          }
        }
        if (res.data == "notexist") {
          setError((prestate) => ({
            ...prestate,
            email: { error: true, message: "Email not exist" },
          }));
        }
      })
      // .then((res) => console.log(res));
  };
  const id = localStorage.getItem("id");
  if (id) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="login_page">
      <div className="login_container">
        <h1>LOGIN</h1>
        <form action="" onSubmit={HandleSubmit}>
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {error.email.error && <p>{error.email.message}</p>}
          <input
            type="text"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password.error && <p>Password Incorrect </p>}
          <div className="forget">
            <a className="forget_Pass" href="">
              Forgetton Password?
            </a>
          </div>
          <button type="submit">LOGIN IN</button>
        </form>
        <p>
          Don't Have Account{" "}
          <span>
            <Link to="/register">Register</Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
