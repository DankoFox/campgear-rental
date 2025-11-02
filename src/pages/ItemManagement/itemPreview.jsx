// @ts-nocheck
import React, { useState } from "react";

const ItemPreview = ({ formData }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="bg-gray-50 shadow-md rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Preview</h2>

      {/* Image preview */}
      {formData.image.length > 0 ? (
        <>
          <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
            <img
              src={formData.image[selectedImage] || formData.image[0]}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          {formData.image.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {formData.image.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Details */}
      <h3 className="text-xl font-semibold mt-3">
        {formData.name || "Item Name"}
      </h3>
      <p className="text-green-700 mt-1">{formData.brand || "Brand"}</p>
      <p className="text-gray-500">{formData.type || "Type"}</p>

      <p className="text-lg font-bold mt-2">
        {formData.price ? `${formData.price.toLocaleString()}₫` : "Price"}
      </p>

      {/* Features */}
      <div className="mt-2 flex flex-wrap gap-2">
        {formData.features.map((feature, idx) => (
          <span
            key={idx}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
          >
            {feature}
          </span>
        ))}
      </div>

      <p className="mt-2 text-gray-500">{formData.location}</p>
      <p
        className={`mt-1 font-medium ${
          formData.availability === "available"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {formData.availability === "available" ? "Available" : "Unavailable"}
      </p>
    </div>
  );
};

export default ItemPreview;
