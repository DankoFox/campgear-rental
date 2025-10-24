import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon
          key={i}
          name="Star"
          size={16}
          className="text-yellow-400 fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon
          key="half"
          name="StarHalf"
          size={16}
          className="text-yellow-400 fill-current"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-muted" />
      );
    }

    return stars;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach((review) => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const sortedReviews = [...reviews]?.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b?.rating - a?.rating;
      case "lowest":
        return a?.rating - b?.rating;
      default:
        return 0;
    }
  });

  const displayedReviews = showAllReviews
    ? sortedReviews
    : sortedReviews?.slice(0, 3);
  const ratingDistribution = getRatingDistribution();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg">
          Đánh giá từ khách hàng
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="highest">Điểm cao nhất</option>
            <option value="lowest">Điểm thấp nhất</option>
          </select>
        </div>
      </div>
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {averageRating?.toFixed(1)}
          </div>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {getRatingStars(averageRating)}
          </div>
          <p className="text-sm text-muted-foreground">
            Dựa trên {totalReviews} đánh giá
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1]?.map((rating) => {
            const count = ratingDistribution?.[rating];
            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={rating} className="flex items-center space-x-2 text-sm">
                <span className="w-8">{rating} sao</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-muted-foreground">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div
            key={review?.id}
            className="border-b border-border pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-medium">
                  {review?.userName?.charAt(0)?.toUpperCase()}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{review?.userName}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {getRatingStars(review?.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>

                  {review?.isVerified && (
                    <div className="flex items-center space-x-1 text-success text-sm">
                      <Icon name="CheckCircle" size={16} />
                      <span>Đã xác thực</span>
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-3">
                  {review?.comment}
                </p>

                {review?.images && review?.images?.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review?.images?.map((image, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 rounded-md overflow-hidden"
                      >
                        <img
                          src={image?.url}
                          alt={image?.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {review?.rentalPeriod && (
                  <p className="text-xs text-muted-foreground">
                    Thuê từ {formatDate(review?.rentalPeriod?.start)} đến{" "}
                    {formatDate(review?.rentalPeriod?.end)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More/Less Button */}
      {reviews?.length > 3 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews
              ? "Ẩn bớt đánh giá"
              : `Xem thêm ${reviews?.length - 3} đánh giá`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
