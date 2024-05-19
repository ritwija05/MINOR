import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccidentMap from "../AccidentMap";

export const SearchReview = () => {
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [reversedReviews, setReversedReviews] = useState([]);
  const collegeData = ["JUIT", "JIIT", "JUET"];

  const departmentData = {
    JUIT: ["CSE 1A", "ECE 2A", "IT 3A"],
    JIIT: ["CSE 1B", "ECE 2B", "IT 3B"],
    JUET: ["CSE 1C", "ECE", "IT 3C"]
  };

  const navigate = useNavigate();

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews"));
    if (storedReviews) {
      setReversedReviews(storedReviews.reverse());
    }
  }, []);

  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const handleCollegeChange = handleInputChange(setSelectedCollege);
  const handleDepartmentChange = handleInputChange(setSelectedDepartment);
  const handleTeacherChange = handleInputChange(setSelectedTeacher);

  const getReviews = (e) => {
    e.preventDefault();
    const filteredReviews = reversedReviews.filter((review) => {
      return (
        (!selectedCollege || review.collegeName === selectedCollege) &&
        (!selectedDepartment || review.departmentName === selectedDepartment) &&
        (!selectedTeacher || review.teacherName === selectedTeacher)
      );
    });

    if (filteredReviews.length === 0) {
      setResponseMessage("No review found");
    } else {
      setResponseMessage(null);
      setReversedReviews(filteredReviews);
    }
  };

  return (
    <div className="w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center">
      <h1 className="text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">
        Search Review
      </h1>
      <div className="w-full bg-white p-2 sm:p-5 md:px-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex justify-between w-full px-4 sm:px-10">
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
          onSubmit={getReviews}
          className="w-full rounded-lg shadow-md p-2 sm:p-4 md:p-5 flex flex-col items-center mt-5"
        >
          <div className="w-full mb-4">
            <label className="text-sm md:text-lg text-gray-800">
              College Name :
            </label>
            <select
              onChange={handleCollegeChange}
              value={selectedCollege}
              className="w-full block border border-gray-300 rounded-lg text-sm md:text-lg h-8 md:h-10 mb-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a college</option>
              {collegeData.map((college) => (
                <option value={college} key={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-4">
            <label className="text-sm md:text-lg text-gray-800">
              Department Name :
            </label>
            <select
              onChange={handleDepartmentChange}
              value={selectedDepartment}
              className="w-full block border border-gray-300 rounded-lg text-sm md:text-lg h-8 md:h-10 mb-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
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

          <div className="w-full mb-4">
            <label className="text-sm md:text-lg text-gray-800">
              Student  Name :
            </label>
            <input
              className="w-full block border border-gray-300 rounded-lg text-sm md:text-lg h-8 md:h-10 mb-2 mt-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedTeacher}
              onChange={handleTeacherChange}
            />
          </div>
          <button
            type="submit"
            className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 px-2 py-1 rounded-lg hover:bg-primary-dark transition duration-300"
          >
            Search
          </button>
        </form>
        <div className="w-full rounded-lg shadow-lg mt-5 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4">
          {reversedReviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary mb-2">{review.collegeName}</h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Department:</span> {review.departmentName}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Teacher:</span> {review.teacherName}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Rating:</span> 
                <span className="text-yellow-500 ml-1">{review.rating}</span>
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Review:</span> {review.review}
              </p>
              {review.latitude && review.longitude && (
                <div className="mb-4">
                  <AccidentMap latitude={review.latitude} longitude={review.longitude} />
                </div>
              )}
            </div>
          ))}
          {responseMessage && <span>{responseMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default SearchReview;
