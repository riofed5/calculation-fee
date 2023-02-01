/*
Rules for calculating a delivery fee

If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.

A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
  Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
  Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
  Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€

If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€
  Example 1: If the number of items is 4, no extra surcharge
  Example 2: If the number of items is 5, 50 cents surcharge is added
  Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
  Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)

The delivery fee can never be more than 15€, including possible surcharges.
The delivery is free (0€) when the cart value is equal or more than 100€.
During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€).
*/

const isFridayRush = (deliveryTime: string) => {
  const selectedTime = new Date(deliveryTime).getTime();

  const selectedDayOfWeek = new Date(deliveryTime).getUTCDay();

  const fromRushHour = new Date(deliveryTime).setUTCHours(15, 0, 0);

  const toRushHour = new Date(deliveryTime).setUTCHours(19, 0, 0);

  //   Check if day of week is equal Friday which means 5
  if (selectedDayOfWeek === 5) {
    // Check if hour from UTC 3pm to 7pm
    if (selectedTime >= fromRushHour && selectedTime <= toRushHour) {
      return true;
    }
    return false;
  }

  return false;
};

export const calculateDevliveryFee = (
  totalCurrCart: number,
  numberOfItem: number,
  distance: number,
  deliveryTime: any
) => {
  let deliveryFee = 0;
  let surcharge = 0;

  let distanceFee = 0.0;

  // The delivery is free (0€) when the cart value is equal or more than 100€.
  if (totalCurrCart >= 100) {
    return {
      message:
        "The delivery is free (0€) when the cart value is equal or more than 100€",
      value: "0",
    };
  }

  // If the cart value is less than 10€, the surcharge is the difference between the cart value and 10€.
  if (totalCurrCart < 10) {
    surcharge = 10 - totalCurrCart;
  }

  // If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item.
  // An extra "bulk" fee applies for more than 12 items of 1,20€
  if (numberOfItem > 4) {
    surcharge = (numberOfItem - 4) * 0.5 + (numberOfItem > 12 ? 1.2 : 0);
  }
  // A delivery fee for the first 1000 meters (=1km) is 2€
  if (distance <= 1000) {
    distanceFee = 2;
  } else {
    const quotient = Math.floor(distance / 500); // => 4 => the times 3 fits into 13
    const remainder = distance % 500;

    // If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
    distanceFee = 2 + quotient * 1 + (remainder > 0 ? 1 : 0);
  }

  deliveryFee = surcharge + distanceFee;

  const isBusyTime = isFridayRush(deliveryTime);

  if (isBusyTime) {
    deliveryFee = +(deliveryFee * 1.2).toFixed(2);
  }

  return deliveryFee < 15
    ? { message: "", value: deliveryFee.toString() }
    : { message: "", value: "15" };
};
