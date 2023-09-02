import React, { useState } from "react";
import {  useUserContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Constant/axios";
import "./Signup.css";
import About from "../About/About";

function SignUp() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState('');

  //importing global state from context
  const [userData, setUserData] = useUserContext();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("api/users", form);

      const loginRes = await axios.post("api/users/login", {
        email: form.email,
        password: form.password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);

      navigate("/");
    } catch (err) {
      console.log("problem ==>", err.response.data.msg);
      setError(err.response.data.msg);
    }
  };
  return (
    <div className="signup flex align-center justify-center">
      <div className="signup__wrapper">
        <div className="error">
          {error ? <p className="error-alert">{error}</p> : ""}
        </div>
        <div className="signup_container animation">
          <div className="signup__top">
            <h3 className="signup__title">Join the network</h3>
            <p>
              Already have an account?
              <Link className="login__link clear_link" to="/login">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onChange={handleChange}
              placeholder="Email Address"
            />
            <br />
            <div className="signup__name">
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
              />
              <br />
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
            <br />
            <input
              type="text"
              name="userName"
              onChange={handleChange}
              placeholder="Username"
            />
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <br />
            <p className="terms__link">
              I agree to the <Link to="/">privacy policy</Link> and
              <Link to="/"> terms of service</Link>.
            </p>
            <br />
            <button className="btn">Agree and Join</button>
          </form>
          <div className=" bottom-link center mt-1">
            <Link className=" link-3 col-2 center " to="/login">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
      <About />
    </div>
  );
}

export default SignUp;
