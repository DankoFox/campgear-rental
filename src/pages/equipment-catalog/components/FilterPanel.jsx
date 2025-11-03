import React, { useState, useMemo, useEffect } from "react";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";
import Icon from "../../../components/AppIcon";
import { Select } from "@/components/ui/select";

const FilterPanel = ({
  products = [],
  filters,
  onFiltersChange,
  isOpen,
  onToggle,
  isMobile = false,
}) => {
  const [priceRange, setPriceRange] = useState([0, 200000]);

  // --- Dynamic min & max prices ---
  const minPrice = useMemo(
    () =>
      products.length ? Math.min(...products.map((p) => p.price || 0)) : 0,
    [products]
  );
  const maxPrice = useMemo(
    () =>
      products.length ? Math.max(...products.map((p) => p.price || 0)) : 200000,
    [products]
  );

  useEffect(() => {
    if (filters?.priceRange) setPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  // --- Dynamic category and brand counts ---
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      const cat = p.type?.toLowerCase() || "other";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [products]);

  const brandCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      // normalize: lowercase and remove non-alphanumeric characters
      const normalized = (p.brand || "unknown")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      counts[normalized] = (counts[normalized] || 0) + 1;
    });
    return counts;
  }, [products]);

  // --- Filter options ---
  const categories = [
    { id: "tents", label: "Tents" },
    { id: "sleeping", label: "Sleeping Bags" },
    { id: "cooking", label: "Cooking Gear" },
    { id: "backpacks", label: "Backpacks" },
    { id: "lighting", label: "Lighting" },
    { id: "tools", label: "Tools" },
  ];

  const brands = [
    { id: "coleman", label: "Coleman" },
    { id: "thenorthface", label: "The North Face" },
    { id: "msr", label: "MSR" },
    { id: "deuter", label: "Deuter" },
    { id: "petzl", label: "Petzl" },
    { id: "jetboil", label: "Jetboil" },
    { id: "helinox", label: "Helinox" },
    { id: "seatosummit", label: "Sea to Summit" },
    { id: "yeti", label: "YETI" },
    { id: "platypus", label: "Platypus" },
  ];

  const locations = [
    { value: "Hanoi", label: "Hanoi" },
    { value: "Ho Chi Minh City", label: "Ho Chi Minh City" },
    { value: "Da Nang", label: "Da Nang" },
    { value: "Ha Long", label: "Ha Long" },
    { value: "Da Lat", label: "Da Lat" },
    { value: "Nha Trang", label: "Nha Trang" },
  ];

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
  ];

  // --- Event handlers ---
  const handleCategoryChange = (id, checked) => {
    const newCategories = checked
      ? [...(filters.categories || []), id]
      : (filters.categories || []).filter((c) => c !== id);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (id, checked) => {
    const newBrands = checked
      ? [...(filters.brands || []), id]
      : (filters.brands || []).filter((b) => b !== id);
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Math.min(
      Math.max(parseInt(value) || 0, minPrice),
      maxPrice
    );
    if (newRange[0] > newRange[1]) newRange[0] = newRange[1];
    setPriceRange(newRange);
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const clearFilters = () => {
    const defaultRange = [minPrice, maxPrice];
    setPriceRange(defaultRange);
    onFiltersChange({
      categories: [],
      brands: [],
      location: "",
      priceRange: defaultRange,
      sortBy: "relevance",
    });
  };

  // --- Render UI ---
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort By */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">Sort By</h3>
        <Select
          options={sortOptions}
          value={filters?.sortBy || "relevance"}
          onChange={(value) => onFiltersChange({ ...filters, sortBy: value })}
        />
      </div>

      {/* Location */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">Location</h3>
        <Select
          options={locations}
          value={filters?.location || ""}
          onChange={(value) => onFiltersChange({ ...filters, location: value })}
          placeholder="Select city"
          clearable
        />
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">
          Price Range (₫/day)
        </h3>
        <div className="flex flex-col space-y-2">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step="10000"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, e.target.value)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step="10000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString("en-US")}₫</span>
            <span>{priceRange[1].toLocaleString("en-US")}₫</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center justify-between">
              <Checkbox
                label={c.label}
                checked={filters.categories.includes(c.id)}
                onChange={(e) => handleCategoryChange(c.id, e.target.checked)}
              />
              <span className="text-sm text-muted-foreground">
                ({categoryCounts[c.id] || 0})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">Brands</h3>
        <div className="space-y-2">
          {brands.map((b) => (
            <div key={b.id} className="flex items-center justify-between">
              <Checkbox
                label={b.label}
                checked={filters.brands.includes(b.id)}
                onChange={(e) => handleBrandChange(b.id, e.target.checked)}
              />
              <span className="text-sm text-muted-foreground">
                ({brandCounts[b.id] || 0})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="outline"
        onClick={clearFilters}
        iconName="RotateCcw"
        iconPosition="left"
        fullWidth
      >
        Clear Filters
      </Button>
    </div>
  );

  // --- Mobile Drawer ---
  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="md:hidden"
        >
          Filters
        </Button>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={onToggle}
            />
            <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-modal">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-heading font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="icon" onClick={onToggle}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
                <FilterContent />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // --- Desktop Panel ---
  return (
    <div className="hidden md:block w-80 bg-card border border-border rounded-lg p-6 h-fit  top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg">Filters</h2>
        <Icon name="Filter" size={20} className="text-muted-foreground" />
      </div>
      <FilterContent />
    </div>
  );
};

export default FilterPanel;
