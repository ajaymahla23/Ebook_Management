import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/ApiFunctions";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { doLogin } from "../utils/AuthApi";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/ebook/user/home";

  function handleReset() {
    setLogin({
      email: "",
      password: "",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (login.email.trim() == "" || login.password.trim() == "") {
      toast.error("Username or Password is required!!!");
      return;
    }

    // const success = await loginUser(login);
    // if (success) {
    //   debugger;
    //   const token = success.token;
    //   console.log("token : ",token);
    //   //   auth.handleLogin(token);
    //   const decodedToken = jwtDecode(token);
    //   localStorage.setItem("userId", decodedToken.sub);
    //   localStorage.setItem("userRole", decodedToken.roles.join(","));
    //   localStorage.setItem("token", token);
    //   navigate("/ebook/user/home");
    //   window.location.reload();
    //   //   navigate(redirectUrl, { replace: true });
    // } else {
    //   setErrorMessage("Invalid username or password. Please try again.");
    // }
    const response = await loginUser(login);
    if (response) {
      const token = response.token;
      doLogin(response, () => {
        // redirect
        navigate("/ebook/user/home");
      });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="container col-6 mt-5 mb-5">
        <ToastContainer />
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={login.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={login.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-hotel"
              style={{ marginRight: "10px" }}
            >
              Login
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="btn btn-hotel"
              style={{ marginRight: "10px" }}
            >
              Reset
            </button>
            <span style={{ marginLeft: "10px" }}>
              Don't' have an account yet?<Link to={"/register"}> Register</Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
};
export default LoginForm;
