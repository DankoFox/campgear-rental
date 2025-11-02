// FileUpload.jsx
import React from "react";

const FileUpload = ({ files = [], onChange }) => {
  // Handle new files
  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    onChange([...files, ...newFiles]); // Append new files
  };

  // Remove a file by index
  const handleRemove = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onChange(updatedFiles);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesChange}
        className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#052E16] focus:border-[#052E16] outline-none"
      />

      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded"
            >
              <span className="truncate max-w-xs">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700 font-semibold ml-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
