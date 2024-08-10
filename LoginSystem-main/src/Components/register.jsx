import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setCofirmPassword]=useState('')
  const navigate = useNavigate();
  const [error, setError] = useState({
    email: { error: false,message:"" },
    password: { error: false },
    confirmPassword:{error:false}
  });
  const HandleSubmit = (e) => {
    e.preventDefault();
    const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regExpPassord =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (regExpEmail.test(email)) {
      console.log("email valid");
      setError((prestate) => ({ ...prestate, email: { error: false,message:"" } }));
    } else {
      console.log("email not valid");
      setError((prestate) => ({ ...prestate, email: { error: true,message:"Email Not Valid" } }));
    }
    if (regExpPassord.test(password)) {
      console.log("valid");
      setError((prestate) => ({ ...prestate, password: { error: false } }));
    } else {
      console.log("not valid");
      setError((prestate) => ({ ...prestate, password: { error: true } }));
      setError((prestate) => ({ ...prestate, confirmPassword: { error: false } }));
      return ;
    }
    if(password!==confirmPassword){
      setError((prestate) => ({ ...prestate, confirmPassword: { error: true } }));
      return;
    }else{
      setError((prestate) => ({ ...prestate, confirmPassword: { error: false } }));
    }
    if (regExpEmail.test(email) && regExpPassord.test(password)) {
      console.log("login valid");
      axios
        .post("http://localhost:3001/register", { email, password })
        .then(console.log("hi"))
        .then((res) => {
          console.log(res.data);
          if (res.data[0] == "exit") {
            console.log("email exist");
            setError((prestate) => ({ ...prestate, email: { error: true,message:"Email already exist" } }));
          }
          if (res.data == "notexist") {
            console.log("register success");
            navigate("/login");
          }
        });
    }
  };
  const id = localStorage.getItem("id");
  if (id) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="login_page">
      <div className="login_container">
        <h1>Register</h1>
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
          {error.password.error && <p>Password not vaild</p>}
          <input
            type="text"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setCofirmPassword(e.target.value)}
          />
          {error.confirmPassword.error&& <p>password not match</p>}
          <button type="submit">SIGN UP</button>
        </form>
        <p>
          Already Have an Account ?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default Register;
