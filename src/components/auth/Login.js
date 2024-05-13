import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const loginuser = (e) => {
    e.preventDefault();
    if (userId === "user123@gmail.com" && password === "QWERTY123") {
      localStorage.setItem("isLoggedIn", true);
      setMessage("Login successful!"); 
      setTimeout(() => {
        navigate("/home/reviews");
      }, 1500);
    } else {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="w-full m-auto flex flex-col justify-center items-center h-svh bg-gray-100">
      <h1 className="text-center text-md sm:text-4xl md:text-5xl text-primary font-arial font-bold mb-5">EMERGEASE:Reporting Application</h1>
      <div className="px-5 xl:px-12 py-5 w-5/6 sm:w-2/3 lg:w-1/3 bg-primary flex flex-col rounded-md">
        <h1 className="text-center text-white font-bold text-3xl mb-8">Log In</h1>
        <form onSubmit={loginuser} className="flex flex-col gap-8">
          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            name="userId"
            placeholder="Enter Your Email"
            type="email"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            name="password"
            placeholder="Enter Your Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="bg-white xl:mt-6 py-2 text-lg">Login</button>
        </form>
        <div className="text-lg text-gray-400 mt-5 text-center">{message}</div>
        <span className="text-white text-lg text-end mb-5 xl:my-5">Don't have an account? <Link to={'/signup'}><button className="text-white underline">SignUp</button></Link></span>
      </div>
      <span className="my-5 px-7 text-center">
        <p className="text-lg font-medium">Login using this Email and Password to test the app</p>
        <h1 className="text-center"><span className="font-medium">Email:</span> user123@gmail.com</h1>
        <h1 className="text-center"><span className="font-medium">Password:</span> QWERTY123</h1>
      </span>
    </div>
  );
};

export default Login;
