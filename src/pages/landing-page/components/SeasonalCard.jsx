const SeasonalCard = ({ image, title, description, onAddToCart }) => {
  return (
    <div className="relative w-full h-max max-w-sm rounded-2xl overflow-hidden shadow-lg border border-border bg-card">
      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full max-h-96 object-cover" />

        {/* Floating description box */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/8 w-[90%] bg-card rounded-2xl shadow-md p-5 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
          <button
            onClick={onAddToCart}
            className="w-full border border-primary text-primary font-medium py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeasonalCard;
