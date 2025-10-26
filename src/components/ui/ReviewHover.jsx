const ReviewHover = ({ equipmentName }) => {
  const handleClick = () => {
    const query = encodeURIComponent(equipmentName);
    const url = `https://www.reddit.com/search/?q=${query}`;
    console.log(url);

    window.open(url, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col -ml-[20px] items-start cursor-pointer group select-none"
    >
      <div className="relative w-36 h-12 flex justify-center items-center overflow-hidden">
        {/* Logo (default visible) */}
        <img
          src="../svg/reddit.svg"
          alt="Reddit logo"
          className="absolute w-48 h-12 opacity-100 translate-y-0 transition-all duration-500 
          group-hover:opacity-0 group-hover:-translate-y-3"
        />

        {/* Text (shows on hover) */}
        <span
          className="absolute font-semibold text-orange-500 opacity-0 translate-y-3 transition-all duration-500 
          group-hover:opacity-100 group-hover:translate-y-0"
        >
          Find reviews
        </span>
      </div>
    </div>
  );
};

export default ReviewHover;
