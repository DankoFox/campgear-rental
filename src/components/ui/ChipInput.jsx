import React, { useState, useRef, useEffect } from "react";

const ChipInput = ({ suggestions = [], value = [], onChange }) => {
  const [chips, setChips] = useState(value || []);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setChips(value || []);
  }, [value]);

  // Filter suggestions as user types
  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    const filtered = suggestions.filter(
      (s) => s.toLowerCase().includes(val.toLowerCase()) && !chips.includes(s)
    );
    setFilteredSuggestions(filtered);
  };

  // Add a chip
  const addChip = (val) => {
    if (val && !chips.includes(val)) {
      const updated = [...chips, val];
      setChips(updated);
      onChange && onChange(updated);
    }
    setInputValue("");
    setShowDropdown(false);
  };

  // Remove a chip
  const removeChip = (chipToRemove) => {
    const updated = chips.filter((chip) => chip !== chipToRemove);
    setChips(updated);
    onChange && onChange(updated);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addChip(inputValue.trim());
    } else if (e.key === "Backspace" && !inputValue && chips.length > 0) {
      removeChip(chips[chips.length - 1]);
    }
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show dropdown on focus
  const handleFocus = () => {
    const available = suggestions.filter((s) => !chips.includes(s));
    setFilteredSuggestions(available);
    setShowDropdown(true);
  };

  return (
    <div ref={inputRef} className="relative w-full">
      <div
        className="flex flex-wrap items-center gap-2 p-2 border rounded-lg focus-within:ring-2 
        focus-within:ring-[#052E16] focus-within:border-[#052E16] outline-none bg-white"
      >
        {chips.map((chip) => (
          <div
            key={chip}
            className="flex items-center px-3 py-1 text-sm text-[#052E16] bg-green-50 border border-green-200 rounded-full"
          >
            {chip}
            <button
              onClick={() => removeChip(chip)}
              className="ml-2 text-green-700 hover:text-red-500"
              type="button"
            >
              &times;
            </button>
          </div>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="Type or select..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {showDropdown && filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
          {filteredSuggestions.map((s) => (
            <li
              key={s}
              onClick={() => addChip(s)}
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

export default ChipInput;
