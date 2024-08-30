import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const { loading, login } = useLogin();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // LOGIN LOGIC GOES HERE!
    await login(formState);
  };

  return (
    <div className="signup flex flex-col items-center justify-center w-2/3 mt-10 mb-20 mx-auto border bg-gray-100 rounded-md ">
      <div className="w-full p-6 rounded-md ">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Username</span>
            </label>
            <input
              type="text"
              placeholder="Johndoe97"
              className="w-full input input-bordered h-10  bg-white"
              value={formState.username}
              name="username"
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
              value={formState.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm text-black hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {" "}
            Dont have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 bg-blue-500  border-blue-500 text-white"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner" /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
