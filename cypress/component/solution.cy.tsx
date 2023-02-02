import {
  calcSurchargeByCartValue,
  calcSurchargeByNumberOfItems,
  calculateDevliveryFee,
  calculateDistanceFee,
} from "../../src/solution";

describe("Unit test for calculate distance fee", () => {
  it("If distance < 1km, the distance fee is 2€", () => {
    expect(calculateDistanceFee(700)).to.equal(2);
    expect(calculateDistanceFee(1000)).to.equal(2);
  });

  it("If distance = 1499m , the distance fee is: 2€ base fee + 1€ for the additional 500 m => 3€", () => {
    expect(calculateDistanceFee(1499)).to.equal(3);
  });

  it("If distance = 1500m , the distance fee is: 2€ base fee + 1€ for the additional 500 m => 3€", () => {
    expect(calculateDistanceFee(1500)).to.equal(3);
  });

  it("If distance = 1501m ,2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€", () => {
    expect(calculateDistanceFee(1501)).to.equal(4);
  });
});

describe("Unit test for calculate surcharge fee", () => {
  context("Surcharge by total cart", () => {
    it("If the cart value is 8.9€, The surcharge is the difference between the cart value and 10€ => 1.1€", () => {
      expect(calcSurchargeByCartValue(5)).to.equal(5);
    });
    it("If the cart value is 11€, The surcharge is 0€", () => {
      expect(calcSurchargeByCartValue(11)).to.equal(0);
    });
  });

  context("Surcharge by number of item", () => {
    it("If the number of items is 4, no extra surcharge", () => {
      expect(calcSurchargeByNumberOfItems(4)).to.equal(0);
    });
    it("If the number of items is 5, 50 cents surcharge is added", () => {
      expect(calcSurchargeByNumberOfItems(5)).to.equal(0.5);
    });

    it("If the number of items is 10, 3€ surcharge (6 x 50 cents) is added", () => {
      expect(calcSurchargeByNumberOfItems(10)).to.equal(3);
    });

    it("If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)", () => {
      expect(calcSurchargeByNumberOfItems(13)).to.equal(5.7);
    });
  });
});

describe("Unit test for calculate delivery fee", () => {
  context("Final delivery", () => {
    it("The delivery is free (0€) when the cart value is equal or more than 100€.", () => {
      expect(
        calculateDevliveryFee(200, 5, 2000, "2023-10-10T10:10").value
      ).to.equal("0");
    });

    it("From UTC 3pm-7pm Friday, delivery fee will be multiple by 1.2x but still < 15€", () => {
      const surCharge =
        calcSurchargeByCartValue(10) + calcSurchargeByNumberOfItems(5);
      const distanceFee = calculateDistanceFee(2000);

      const beforeAppliedFriRush = surCharge + distanceFee;

      const afterAppliedFriRush = parseFloat(
        calculateDevliveryFee(10, 5, 2000, "2023-02-03T17:10").value
      ).toFixed(2);

      expect(afterAppliedFriRush).to.equal(
        (1.2 * beforeAppliedFriRush).toFixed(2)
      );
    });

    it("From UTC 3pm-7pm Friday, delivery fee will be multiple by 1.2x and > 15€", () => {
      const afterAppliedFriRush = +calculateDevliveryFee(
        10,
        5,
        200000,
        "2023-02-03T17:10"
      ).value;

      expect(afterAppliedFriRush).to.equal(15);
    });
  });
});
