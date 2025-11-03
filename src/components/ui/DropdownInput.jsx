import React, { useState, useRef, useEffect } from "react";

const DropdownInput = ({ suggestions = [], value = "", onChange }) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    const filtered = suggestions.filter((s) =>
      s.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowDropdown(true);
    onChange && onChange(val);
  };

  const handleSelect = (val) => {
    setInputValue(val);
    onChange && onChange(val);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setFilteredSuggestions(suggestions);
    setShowDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={inputRef} className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder="Select or type..."
        className="w-full border rounded-lg p-2 outline-none 
        focus:ring-2 focus:ring-green-900 focus:border-green-900 text-gray-700"
      />

      {showDropdown && filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredSuggestions.map((s) => (
            <li
              key={s}
              onClick={() => handleSelect(s)}
              className="px-3 py-2 text-gray-700 cursor-pointer hover:bg-green-50"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownInput;
