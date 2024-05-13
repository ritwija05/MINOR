import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [collegeID, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (collegeID === "user123@gmail.com" && password === "QWERTY123") {
      setMessage("User already registered. Please login."); // Assuming user is already registered since it's hardcoded
    } else {
      // Assuming we don't have registration functionality in the frontend for other users
      setMessage("Registration is not available. Please login with the provided credentials.");
    }
  };

  return (
    <div className="w-full m-auto flex flex-col justify-center items-center h-svh">
      <h1 className="text-center text-md sm:text-4xl md:text-5xl text-primary font-arial font-bold mb-5">EMERGEASE:Report Application</h1>
      <div className="px-5 xl:px-12 py-5 w-5/6 sm:w-2/3 lg:w-1/3 bg-primary flex flex-col rounded-md">
        <h1 className="text-center text-white font-bold text-3xl mb-8">Sign Up</h1>
        <form onSubmit={registerUser} className="flex flex-col gap-8">
          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            name="collegeId"
            placeholder="Enter Your CollegeId"
            type="text"
            value={collegeID}
            onChange={(e) => setCollegeId(e.target.value)}
          />
          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            name="password"
            placeholder="Enter A Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-white xl:mt-6 py-2 text-lg">Sign Up</button>
        </form>
        <div className="text-lg text-gray-400 mt-5 text-center">{message}</div>
        <span className="text-white text-lg text-end mb-5 xl:my-5">Already have an account? <Link to={"/"}><button className="text-white underline">Login</button></Link></span>
      </div>
    </div>
  );
};

export default Signup;
