import React from "react";

const MainHeader = ({ comingFrom,user }) => {
  return (
    <div className="flex flex-col p-4 mt-6">
      {comingFrom === "PT" ? (
        <>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {user}'s Treatment History
          </h1>
          <p className="text-gray-600 mb-6">
            Explore all the treatments you have undergone with our organization.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Deepak's Instructions History
          </h1>
          <p className="text-gray-600 mb-6">
            This page contains all the instructions that you have got from the
            doctors from our organization.
          </p>
        </>
      )}
    </div>
  );
};

export default MainHeader;
