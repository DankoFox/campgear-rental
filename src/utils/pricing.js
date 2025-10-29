// Format a number into a price string with "₫"
export const formatPrice = (price) => {
  if (typeof price !== "number" || isNaN(price)) return "0₫";
  return new Intl.NumberFormat("en-US").format(price) + "₫";
};

/**
 * Calculate rental price and rental days
 * @param {Date} startDate - rental start date
 * @param {Date} endDate - rental end date
 * @param {number} dailyPrice - base price per day
 * @param {number} quantity - number of items
 * @returns {{ rentalDays: number, totalPrice: number }}
 */
export const calculateRentalPrice = (
  startDate,
  endDate,
  dailyPrice,
  quantity = 1
) => {
  if (
    !startDate ||
    !endDate ||
    !(startDate instanceof Date) ||
    !(endDate instanceof Date)
  ) {
    return { rentalDays: 0, totalPrice: 0 };
  }

  const timeDiff = endDate.getTime() - startDate.getTime();
  if (timeDiff < 0) return { rentalDays: 0, totalPrice: 0 };

  const days = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

  const pricePerDay = dailyPrice || 0;

  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  const effectivePaidDays = weeks * 5 + remainingDays;

  const totalPrice = effectivePaidDays * pricePerDay * quantity;

  return { rentalDays: days, totalPrice };
};
