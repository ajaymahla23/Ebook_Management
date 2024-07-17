import React, { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [registration, setRegistration] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
  });

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({ name: "", phoneNo: "", email: "", password: "" });
      toast.success("Registered successfully!!!");
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error : ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section className="container col-6 mt-5 mb-5">
        <ToastContainer />
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        {successMessage && (
          <p className="alert alert-success">{successMessage}</p>
        )}

        <h2>Register</h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={registration.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="phoneNo" className="col-sm-2 col-form-label">
              Phone number
            </label>
            <div className="col-sm-10">
              <input
                id="phoneNo"
                name="phoneNo"
                type="text"
                className="form-control"
                value={registration.phoneNo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={registration.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={registration.password}
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
              Register
            </button>
            <span style={{ marginLeft: "10px" }}>
              Already have an account? <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
};
export default RegisterForm;
