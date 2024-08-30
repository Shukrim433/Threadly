import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    surname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const { loading, signup } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // SIGNUP LOGIC GOES HERE!
    await signup(formState); // pass user inputs to signup hook
  };
  return (
    <div className="signup flex flex-col items-center justify-center w-2/3 mt-10 mb-20 mx-auto border bg-gray-100 rounded-md ">
      <div className="w-full p-6 rounded-md ">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">
                First Name
              </span>
            </label>
            <input
              type="text"
              placeholder="John"
              className="w-full input input-bordered h-10 bg-white"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Surname</span>
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full input input-bordered h-10 bg-white"
              name="surname"
              value={formState.surname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Username</span>
            </label>
            <input
              type="text"
              placeholder="Johndoe97"
              className="w-full input input-bordered h-10  bg-white"
              name="username"
              value={formState.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10  bg-white"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10  bg-white"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <Link
            to="/login"
            className="text-sm text-black hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {" "}
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 bg-blue-500  border-blue-500 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
