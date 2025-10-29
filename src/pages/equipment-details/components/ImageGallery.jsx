// @ts-nocheck
import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const ImageGallery = ({ images = [], productName }) => {
  console.log(images);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const currentImage = images[selectedImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
        <Image
          src={currentImage?.replace(/^public\//, "/")}
          alt={`${productName || "Product"} image ${selectedImageIndex + 1}`}
          className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          onClick={toggleZoom}
        />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 hover:bg-card rounded-full flex items-center justify-center shadow-md transition-micro"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 hover:bg-card rounded-full flex items-center justify-center shadow-md transition-micro"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}

        {/* Zoom Tip */}
        <div className="absolute top-2 right-2 bg-card/80 rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1">
          <Icon name="ZoomIn" size={14} />
          Click to zoom
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-card/80 rounded-md px-2 py-1 text-xs font-medium">
          {selectedImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-micro ${
                selectedImageIndex === index
                  ? "border-primary"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <Image
                src={image?.replace(/^public\//, "/")}
                alt={`${productName || "Product"} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Mobile Dots */}
      {images.length > 1 && (
        <div className="md:hidden flex justify-center space-x-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-micro ${
                selectedImageIndex === index ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
