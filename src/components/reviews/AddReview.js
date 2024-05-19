import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Review from "./Review";

const AddReview = () => {
  const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedStar, setSelectedStar] = useState("");
  const [givenReview, setGivenReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [latitude, setLatitude] = useState(""); // Added latitude state
  const [longitude, setLongitude] = useState(""); // Added longitude state
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    // Fetch reviews from local storage on component mount
    const storedReviews = JSON.parse(localStorage.getItem("reviews"));
    if (storedReviews) {
      setReviews(storedReviews);
    }
  }, []);

  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };
  const collegeData = ["JUIT", "JIIT", "JUET"];

  const departmentData = {
    JUIT: ["CSE 1A", "ECE 2A", "IT 3A"],
    JIIT: ["CSE 1B", "ECE 2B", "IT 3B"],
    JUET: ["CSE 1C", "ECE", "IT 3C"],
  };

  const handleCollegeChange = handleInputChange(setSelectedCollege);
  const handleDepartmentChange = handleInputChange(setSelectedDepartment);
  const handleRatingChange = handleInputChange(setSelectedStar);

  const addReview = (e) => {
    e.preventDefault();

    // Creating a new review object
    const newReview = {
      collegeName: selectedCollege,
      departmentName: selectedDepartment,
      teacherName: selectedTeacher,
      rating: selectedStar,
      review: givenReview,
      latitude, // Add latitude to review object
      longitude, 
    };

    // Adding the new review to the reviews list
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Storing reviews in local storage
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    // Resetting form fields
    setSelectedCollege("");
    setSelectedDepartment("");
    setSelectedTeacher("");
    setSelectedStar("");
    setGivenReview("");
    setLatitude(""); // Reset latitude
    setLongitude(""); // Reset longitude
  };

  return (
    <div className="w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center">
      <h1 className="text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">
        Accident Reporting
      </h1>

      <div className="w-full bg-white p-2 sm:p-5 md:px-8 rounded-sm shadow-md flex flex-col items-center">
      <div className="flex justify-between w-full px-4 sm:px-10">
  {/* Button to redirect to Reviews component */}
  <button
    onClick={() => navigate("/home/reviews")}
    className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 p-1 rounded-lg hover:bg-primary-dark transition duration-300"
  >
    View Accident Reports
  </button>
  <Link to="/home/addreview">
    <button className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 p-1 rounded-lg hover:bg-primary-dark transition duration-300">
      Report an Accident
    </button>
  </Link>
  <Link to="/home/searchreview">
    <button className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 p-1 rounded-lg hover:bg-primary-dark transition duration-300">
      Search Reports
    </button>
  </Link>
</div>

<form
  onSubmit={addReview}
  className="w-full rounded-lg shadow-md p-4 sm:p-6 md:p-8 flex flex-col items-center"
>
  {/* Form Inputs */}
  {/* College Name */}
  <div className="w-full mb-4">
    <label className="text-lg text-gray-800 font-semibold mb-1">College Name:</label>
    <select
      onChange={handleCollegeChange}
      value={selectedCollege}
      className="w-full bg-gray-100 border border-gray-400 rounded-lg py-2 px-4 text-lg focus:outline-none"
    >
      <option value="">Select a college</option>
      {collegeData.map((college) => (
        <option value={college} key={college}>
          {college}
        </option>
      ))}
    </select>
  </div>

  {/* Department Name */}
  <div className="w-full mb-4">
    <label className="text-lg text-gray-800 font-semibold mb-1">Department Name:</label>
    <select
      onChange={handleDepartmentChange}
      value={selectedDepartment}
      className="w-full bg-gray-100 border border-gray-400 rounded-lg py-2 px-4 text-lg focus:outline-none"
    >
      <option value="">Select a Department</option>
      {selectedCollege &&
        departmentData[selectedCollege].map((department) => (
          <option value={department} key={department}>
            {department}
          </option>
        ))}
    </select>
  </div>

  {/* Teacher Name */}
  <div className="w-full mb-4">
    <label className="text-lg text-gray-800 font-semibold mb-1">Student Name:</label>
    <input
      className="w-full bg-gray-100 border border-gray-400 rounded-lg py-2 px-4 text-lg focus:outline-none"
      value={selectedTeacher}
      onChange={handleInputChange(setSelectedTeacher)}
    />
  </div>

  {/* Rating */}
  <div className="w-full mb-4">
    <label className="text-lg text-gray-800 font-semibold mb-1">Rating:</label>
    <select
      onChange={handleRatingChange}
      value={selectedStar}
      className="w-full bg-gray-100 border border-gray-400 rounded-lg py-2 px-4 text-lg focus:outline-none"
    >
      <option value="">Give the star</option>
      {rating.map((star) => (
        <option value={star} key={star}>
          {star}
        </option>
      ))}
    </select>
  </div>

  {/* Latitude */}
  <div className="w-full mb-4">
    <label className="text-lg text-gray-800 font-semibold mb-1">Latitude:</label>
    <input
      type="text"
      className="w-full bg-gray-100 border border-gray-400 rounded-lg py-2 px-4 text-lg focus:outline-none"
      value={latitude}
      onChange={(e) => setLatitude(e.target.value)}
    />
  </div>

  {/* Longitude */}
  <div className="w-full mb-4">
    <label className="text-lg text-gray-800 font-semibold mb-1">Longitude:</label>
    <input
      type="text"
      className="w-full bg-gray-100 border border-gray-400 rounded-lg py-2 px-4 text-lg focus:outline-none"
      value={longitude}
      onChange={(e) => setLongitude(e.target.value)}
    />
  </div>

  {/* Review */}
  <div className="w-full mb-4">
    <label className="text-lg text-gray-800 font-semibold mb-1">Enter The Details:</label>
    <textarea
      className="w-full bg-gray-100 border border-gray-400 rounded-lg py-2 px-4 text-lg focus:outline-none resize-none"
      value={givenReview}
      onChange={handleInputChange(setGivenReview)}
      rows={6}
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="bg-primary font-normal text-white text-lg py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-300"
  >
    Submit
  </button>
</form>



        {/* Display Reviews */}
        <div className="w-full border rounded-lg shadow-md mt-5 p-2 sm:p-4">
  {reviews.map((review, index) => (
    <div key={index} className="border-b py-4">
      <Review data={review} />
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default AddReview;
