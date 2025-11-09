import React from "react";

function Image({ src, alt = "Image Name", className = "", ...props }) {
  console.log("src", src);
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      // onError={(e) => {
      //   e.target.src = "/assets/images/no_image.png";
      // }}
      {...props}
    />
  );
}

export default Image;
