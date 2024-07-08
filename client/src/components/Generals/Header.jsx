import React from "react";

const Header = ({ main_content, para_content }) => {
  return (
    <div className="flex flex-col p-2">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">{main_content}</h1>
      <p className="text-gray-600 mb-6">{para_content}</p>
    </div>
  );
};

export default Header;
