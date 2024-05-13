import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Review from "./Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Fetch reviews from local storage
    const storedReviews = JSON.parse(localStorage.getItem("reviews"));
    if (storedReviews) {
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

  // Sort the reviews based on rating in descending order
  const sortedReviews = reviews.slice().sort((a, b) => b.rating - a.rating);

  return (
    <div className="w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center">
      <h1 className="text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">
        Accident Reports
      </h1>
      <div className="w-full bg-white p-2 sm:p-5 rounded-sm shadow-md flex flex-col items-center">
        <div className="flex justify-between w-full px-4 sm:px-10">
          <Link to="/home/addreview">
            <button className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 p-1 rounded-sm">
              Report an Accident
            </button>
          </Link>
          <Link to="/home/searchreview">
            <button className="bg-primary font-normal text-white sm:text-xl sm:px-3 sm:py-2 text-sm p-1 rounded-sm">
              Search Reports
            </button>
          </Link>
        </div>
        <div className="w-full rounded-sm shadow-md mt-5 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review, index) => (
              <Review
                key={index}
                data={review}
                onDelete={() => handleDelete(review)} // Pass the handleDelete function to Review component
              />
            ))
          ) : (
            <p>No accident reports available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
