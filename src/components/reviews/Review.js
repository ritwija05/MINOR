import React from "react";
import AccidentMap from "../AccidentMap";

const Review = ({ data, onDelete }) => {
  const { collegeName, departmentName, teacherName, rating, review, latitude, longitude } = data;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 w-full">
      <h2 className="text-2xl font-bold text-primary mb-2">{collegeName}</h2>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Department:</span> {departmentName}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Teacher:</span> {teacherName}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Rating:</span>
        <span className="text-yellow-500 ml-1">{rating}</span>
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Review:</span> {review}
      </p>
      {latitude && longitude && (
        <div className="mb-4">
          <AccidentMap latitude={latitude} longitude={longitude} />
        </div>
      )}
      <button 
        onClick={onDelete} 
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
      >
        Delete
      </button>
    </div>
  );
};

export default Review;
