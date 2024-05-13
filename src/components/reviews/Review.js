import React from "react";

const Review = ({ data, onDelete }) => {
  const { collegeName, departmentName, rating, review, teacherName } = data;

  const handleDelete = () => {
    // Call the onDelete function with the review data to delete it
    onDelete(data);
  };

  return (
    <div className="border border-gray-300 w-full flex flex-col px-1 sm:px-3 sm:py-1 rounded-sm">
      <h1 className="text-gray-800 font-bold text-2xl sm:text-3xl">
        {teacherName}
      </h1>
      <span className="text-primary text-sm2 sm:text-xl font-bold sm:my-1">
        {collegeName}, {departmentName}
      </span>
      <span className="text-gray-800 font-medium sm:text-xl">
        Review :{" "}
        <p className="inline font-normal">{review}</p>{" "}
      </span>
      <span className="text-gray-800 font-medium sm:text-xl sm:my-1">
        Rating : <p className="inline font-normal">{rating}</p>{" "}
      </span>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white text-sm px-3 py-1 rounded-md mt-2"
      >
        Delete
      </button>
      
    </div>
  );
};

export default Review;
