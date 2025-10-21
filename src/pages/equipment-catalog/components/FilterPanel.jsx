import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";
import Icon from "../../../components/AppIcon";

const FilterPanel = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle,
  isMobile = false,
}) => {
  const [priceRange, setPriceRange] = useState([0, 2000000]);

  const categories = [
    { id: "tents", label: "Lều trại", count: 45 },
    { id: "sleeping", label: "Túi ngủ", count: 32 },
    { id: "cooking", label: "Dụng cụ nấu ăn", count: 28 },
    { id: "backpacks", label: "Ba lô", count: 24 },
    { id: "lighting", label: "Đèn chiếu sáng", count: 18 },
    { id: "tools", label: "Dụng cụ", count: 15 },
  ];

  const locations = [
    { value: "hanoi", label: "Hà Nội" },
    { value: "hcm", label: "TP. Hồ Chí Minh" },
    { value: "danang", label: "Đà Nẵng" },
    { value: "halong", label: "Hạ Long" },
    { value: "dalat", label: "Đà Lạt" },
    { value: "nhatrang", label: "Nha Trang" },
  ];

  const brands = [
    { id: "coleman", label: "Coleman", count: 23 },
    { id: "northface", label: "The North Face", count: 18 },
    { id: "decathlon", label: "Decathlon", count: 15 },
    { id: "naturehike", label: "Naturehike", count: 12 },
    { id: "msr", label: "MSR", count: 8 },
  ];

  const sortOptions = [
    { value: "relevance", label: "Phù hợp nhất" },
    { value: "price_low", label: "Giá thấp đến cao" },
    { value: "price_high", label: "Giá cao đến thấp" },
    { value: "rating", label: "Đánh giá cao nhất" },
    { value: "distance", label: "Khoảng cách gần nhất" },
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter((id) => id !== categoryId);

    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brandId, checked) => {
    const newBrands = checked
      ? [...(filters?.brands || []), brandId]
      : (filters?.brands || [])?.filter((id) => id !== brandId);

    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const clearFilters = () => {
    setPriceRange([0, 2000000]);
    onFiltersChange({
      categories: [],
      brands: [],
      location: "",
      priceRange: [0, 2000000],
      sortBy: "relevance",
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">
          Sắp xếp theo
        </h3>
        <Select
          options={sortOptions}
          value={filters?.sortBy || "relevance"}
          onChange={(value) => onFiltersChange({ ...filters, sortBy: value })}
          placeholder="Chọn cách sắp xếp"
        />
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">Địa điểm</h3>
        <Select
          options={locations}
          value={filters?.location || ""}
          onChange={(value) => onFiltersChange({ ...filters, location: value })}
          placeholder="Chọn thành phố"
          clearable
        />
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">
          Khoảng giá (₫/ngày)
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={priceRange?.[0]}
              onChange={(e) => handlePriceChange(0, e?.target?.value)}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={priceRange?.[1]}
              onChange={(e) => handlePriceChange(1, e?.target?.value)}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{priceRange?.[0]?.toLocaleString("vi-VN")}₫</span>
            <span>{priceRange?.[1]?.toLocaleString("vi-VN")}₫</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">Danh mục</h3>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div
              key={category?.id}
              className="flex items-center justify-between"
            >
              <Checkbox
                label={category?.label}
                checked={(filters?.categories || [])?.includes(category?.id)}
                onChange={(e) =>
                  handleCategoryChange(category?.id, e?.target?.checked)
                }
              />
              <span className="text-sm text-muted-foreground">
                ({category?.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-foreground">
          Thương hiệu
        </h3>
        <div className="space-y-2">
          {brands?.map((brand) => (
            <div key={brand?.id} className="flex items-center justify-between">
              <Checkbox
                label={brand?.label}
                checked={(filters?.brands || [])?.includes(brand?.id)}
                onChange={(e) =>
                  handleBrandChange(brand?.id, e?.target?.checked)
                }
              />
              <span className="text-sm text-muted-foreground">
                ({brand?.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearFilters}
        iconName="RotateCcw"
        iconPosition="left"
        fullWidth
      >
        Xóa bộ lọc
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="md:hidden"
        >
          Bộ lọc
        </Button>

        {/* Mobile Filter Panel */}
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={onToggle}
            />
            <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-modal">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-heading font-semibold text-lg">Bộ lọc</h2>
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

  return (
    <div className="hidden md:block w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg">Bộ lọc</h2>
        <Icon name="Filter" size={20} className="text-muted-foreground" />
      </div>
      <FilterContent />
    </div>
  );
};

export default FilterPanel;
