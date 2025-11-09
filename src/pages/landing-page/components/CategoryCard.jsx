import React from "react";

const CategoryCard = ({ title, image, onClick }) => {
  return (
    <div
      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow-lg">
          {title}
        </h2>
        <button className="bg-[#7B7B39] hover:bg-[#6C6C32] text-white px-5 py-2 rounded-full text-sm font-medium transition-all">
          EXPLORE
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
