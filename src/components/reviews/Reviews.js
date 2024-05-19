import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Review from "./Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from local storage
    const storedReviews = JSON.parse(localStorage.getItem("reviews"));
    if (storedReviews) {
      // Sort reviews by rating in descending order
      storedReviews.sort((a, b) => b.rating - a.rating);
      setReviews(storedReviews);
    }
  }, []);

  const handleDelete = (reviewToDelete) => {
    // Filter out the review to delete from the reviews array
    const updatedReviews = reviews.filter(
      (review) => review !== reviewToDelete
    );
    // Update the reviews state
    setReviews(updatedReviews);
    // Update the local storage
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  return (
    <div className="w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center">
      <h1 className="text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">
        Accident Reports
      </h1>
      <div className="w-full bg-white p-2 sm:p-5 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex justify-between w-full px-4 sm:px-10 mb-4">
          <Link to="/home/addreview">
            <button className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 p-1 rounded-lg hover:bg-primary-dark transition duration-300">
              Report an Accident
            </button>
          </Link>
          <Link to="/home/searchreview">
            <button className="bg-primary font-normal text-white sm:text-xl sm:px-3 sm:py-2 text-sm p-1 rounded-lg hover:bg-primary-dark transition duration-300">
              Search Reports
            </button>
          </Link>
        </div>
        <div className="w-full rounded-lg shadow-md p-2 sm:p-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-b-2 border-gray-200">
                <Review
                  data={review}
                  onDelete={() => handleDelete(review)}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">No accident reports available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
