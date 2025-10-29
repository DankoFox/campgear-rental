import React from "react";
import EquipmentCard from "./EquipmentCard";
import Icon from "../../../components/AppIcon";

const EquipmentGrid = ({
  equipment,
  loading,
  onAddToCart,
  onQuickView,
  hasMore,
  onLoadMore,
}) => {
  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card w-[280px]">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-muted rounded-full animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse flex-1" />
        </div>
        <div className="h-6 bg-muted rounded animate-pulse" />
        <div className="flex space-x-2">
          <div className="h-6 bg-muted rounded animate-pulse flex-1" />
          <div className="h-6 bg-muted rounded animate-pulse flex-1" />
        </div>
        <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
        <div className="flex items-center justify-between">
          <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
        </div>
      </div>
    </div>
  );

  if (loading && equipment?.length === 0) {
    return (
      <div className="flex-1 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {Array.from({ length: 9 })?.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!loading && equipment?.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          No equipment found
        </h3>
        <p className="text-muted-foreground max-w-md">
          There is no equipment matching your search criteria. Try adjusting the
          filters or searching with different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {equipment?.length} items
        </p>
      </div>

      {/* Equipment Grid */}
      <div className="grid gap-8 justify-items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {equipment?.map((item) => (
          <EquipmentCard
            key={item?.id}
            equipment={item}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}

        {/* Loading More Skeletons */}
        {loading && equipment?.length > 0 && (
          <>
            {Array.from({ length: 3 })?.map((_, index) => (
              <SkeletonCard key={`loading-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors flex items-center space-x-2"
          >
            <Icon name="Plus" size={16} />
            <span>Load more equipment</span>
          </button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && equipment?.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            You have viewed all available equipment
          </p>
        </div>
      )}
    </div>
  );
};

export default EquipmentGrid;
