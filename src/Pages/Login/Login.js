import React, {  useState } from "react";
import "./Login.css";
import {  useUserContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Constant/axios";
import About from "../About/About";

function Login() {
  const [userData, setUserData] = useUserContext();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [empty, setEmpty] = useState({
    empty_email: false,
    empty_password: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // console.log("form ", form)

  console.log(userData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      setError("");
      setEmpty({ empty_email: true });
    } else if (!form.password) {
      setError("");
      setEmpty({ empty_password: true });
    } else if (Object.keys(form.password).length < 8) {
      setError("Password length must be at least 8 characters!");
    } else {
      try {
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
        console.log("problem", err.response.data.msg);
        setError(err.response.data.msg);
      }
    }
  };

  

  return (
    <div className="login flex align-center justify-center">
      <div className="login__wrapper">
        <div className="error">
          {error ? <p className="error-alert">{error}</p> : ""}
        </div>
        <div className="login_container animation">
          <div className="login__top">
            <h3 className="login__title col-1">Login to your account</h3>
            <p>
              Don’t have an account?
              <Link className="login__link col-2" to="/signup">
                Create a new account
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className={`input ${empty.empty_email && "input_danger"}`}
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Email Address"
            />
            <br />
            <input
              className={`input ${empty.empty_password && "input_danger"}`}
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <br />
            <div className="forgot__link">
              <Link to="/">Forgot password?</Link>
            </div>
            <button className="btn">Login</button>
          </form>
          <div className="bottom-link center mt-1">
            <Link className="link-3 col-2 center " to="/signup">
              Create a new account?
            </Link>
          </div>
        </div>
      </div>
      <About />
    </div>
  );
}

export default Login;
