import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Review from "./Review";

export const SearchReview = () => {
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [reversedReviews, setReversedReviews] = useState([]);
  const collegeData = ["JUIT", "JIIT", "JUET"];

  const departmentData = {
    "JUIT": ["CSE 1A", "ECE 2A", "IT 3A"],
    "JIIT": ["CSE 1B", "ECE 2B", "IT 3B"],
    "JUET": ["CSE 1C", "ECE", "IT 3C"]
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reviews from local storage
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

    // Simulate search operation (for demonstration purpose)
    const filteredReviews = reversedReviews.filter((review) => {
      if (
        (!selectedCollege || review.collegeName === selectedCollege) &&
        (!selectedDepartment || review.departmentName === selectedDepartment) &&
        (!selectedTeacher || review.teacherName === selectedTeacher)
      ) {
        return true;
      }
      return false;
    });

    if (filteredReviews.length === 0) {
      setResponseMessage("No review found");
    } else {
      setResponseMessage(null);
      setReversedReviews(filteredReviews);
    }
  };

  return (
    <>
      <div className="w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">
          Search Review
        </h1>
        <div className="w-full bg-white p-2 sm:p-5 md:px-8 rounded-sm shadow-md flex flex-col items-center">
          <form
            onSubmit={getReviews}
            className="w-full rounded-sm shadow-md p-2 sm:p-4 md:p-5 flex flex-col items-center"
          >
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

            <div className="w-full">
              <label className="text-sm2 md:text-lg text-gray-800">
                Student Name :
              </label>
              <input
                className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 px-1 focus:outline-none"
                value={selectedTeacher}
                onChange={handleTeacherChange}
              />
            </div>
            <button
              type="submit"
              className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 px-2 py-1 rounded-sm"
            >
              Search
            </button>
          </form>
          <div className="w-full rounded-sm shadow-md mt-5 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4">
            {reversedReviews.map((review, index) => (
              <Review key={index} data={review} />
            ))}
            {responseMessage && <span>{responseMessage}</span>}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-4">
        <button
          onClick={() => navigate("/home/reviews")}
          className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 p-1 rounded-sm"
        >
          View Accident Reports
        </button>
      </div>
    </>
  );
};

export default SearchReview;
