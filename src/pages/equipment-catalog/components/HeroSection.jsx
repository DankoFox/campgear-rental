import React from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const HeroSection = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 overflow-hidden">
      {/* Background image layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url("public/assets/images/product-section.png")',
        }}
      ></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <div className="max-w-3xl">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            High-Quality Camping Gear
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Explore our diverse collection of camping equipment from trusted
            brands. Rent today for the perfect adventure!
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Icon
                name="Search"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search for camping gear..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button
              variant="secondary"
              size="lg"
              iconName="Search"
              iconPosition="left"
              onClick={onSearch}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Right image */}
        <img
          src="public/assets/images/horizontal-section.png"
          alt="Camping equipment"
          className="relative w-full md:max-w-lg h-auto object-contain rounded-xl z-10"
        />
      </div>
    </section>
  );
};

export default HeroSection;
