const ReviewHover = ({ search, option = "reddit" }) => {
  const handleClick = () => {
    const query = encodeURIComponent(search);
    let url = "";

    switch (option.toLowerCase()) {
      case "reddit":
        url = `https://www.reddit.com/search/?q=${query}`;
        break;
      case "tiktok":
        url = `https://www.tiktok.com/search?q=${query}`;
        break;
      default:
        url = `https://www.reddit.com/search/?q=${query}`; // fallback
    }

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
          src={option === "tiktok" ? "../svg/tiktok.svg" : "../svg/reddit.svg"}
          alt={`${option} logo`}
          className="absolute w-48 h-12 opacity-100 translate-y-0 transition-all duration-500 
          group-hover:opacity-0 group-hover:-translate-y-3"
        />

        {/* Text (shows on hover) */}
        <span
          className={`absolute font-semibold opacity-0 translate-y-3 transition-all duration-500 
            group-hover:opacity-100 group-hover:translate-y-0 
            ${option === "tiktok" ? "text-black" : "text-orange-500"}`}
        >
          Find reviews
        </span>
      </div>
    </div>
  );
};

export default ReviewHover;
