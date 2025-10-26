import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const truncateText = (text, maxLength = 15) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) : text;
};

const EquipmentItem = ({ equipment }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div
      className="w-[300px] rounded-lg overflow-hidden shadow-card transition-all duration-550 
                hover:rounded-[30%/30%]"
    >
      <Link to="/equipment-details" className="block relative">
        <div className="relative aspect-[1/1] overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <Icon name="Image" size={32} className="text-gray-300" />
            </div>
          )}
          <Image
            src={equipment?.image}
            alt={equipment?.imageAlt}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
          />

          {/* Text overlay */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 text-white font-semibold text-sm 
                 px-3 py-1 rounded-2xl border-2 border-gray-300 shadow-sm text-center"
          >
            {truncateText(equipment?.name, 15)}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EquipmentItem;
