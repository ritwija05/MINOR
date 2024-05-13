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
  className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 p-1 rounded-sm"
>
  View Accident Reports
</button>
          <Link to="/home/addreview">
            <button className="bg-primary font-normal text-white sm:text-xl sm:px-3 sm:py-2 text-sm p-1 rounded-sm">
              Report an Accident
            </button>
          </Link>
          <Link to="/home/searchreview">
            <button className="bg-primary font-normal text-white sm:text-xl sm:px-3 sm:py-2 text-sm p-1 rounded-sm">
              Search Reports
            </button>
          </Link>
        </div>
        <form
          onSubmit={addReview}
          className="w-full rounded-sm shadow-md  p-2 sm:p-4 md:p-5 flex flex-col items-center"
        >
          {/* Form Inputs */}
          {/* College Name */}
          <div className="w-full">
            <label className="text-sm2 md:text-lg text-gray-800">
              College Name :
            </label>
            <select
              onChange={handleCollegeChange}
              value={selectedCollege}
              className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none"
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
          <div className="w-full">
            <label className="text-sm2 md:text-lg text-gray-800">
              Department Name :
            </label>
            <select
              onChange={handleDepartmentChange}
              value={selectedDepartment}
              className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none"
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
          <div className="w-full">
            <label className="text-sm2 md:text-lg text-gray-800">
              Student Name :
            </label>
            <input
              className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 px-1 focus:outline-none"
              value={selectedTeacher}
              onChange={handleInputChange(setSelectedTeacher)}
            />
          </div>

          {/* Rating */}
          <div className="w-full">
            <label className="text-sm2 md:text-lg text-gray-800">Rating :</label>
            <select
              onChange={handleRatingChange}
              value={selectedStar}
              className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none"
            >
              <option value="">Give the star</option>
              {rating.map((star) => (
                <option value={star} key={star}>
                  {star}
                </option>
              ))}
            </select>
          </div>

          {/* Review */}
          <div className="w-full">
            <label className="text-sm2 md:text-lg text-gray-800">
              Enter The Details :
            </label>
            <textarea
              className="w-full block border border-gray-500 rounded-sm text-lg h-20 mb-2 mt-1 p-2 focus:outline-none"
              value={givenReview}
              onChange={handleInputChange(setGivenReview)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 px-2 py-1 rounded-sm"
          >
            Submit
          </button>
        </form>

        {/* Display Reviews */}
        <div className="w-full rounded-sm shadow-md mt-5 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4">
          {reviews.map((review, index) => (
            <Review key={index} data={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddReview;
