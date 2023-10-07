/**
 * @param {number[]} prices
 * @return {number}
 */
 // naive solution
 var maxProfit = function(prices) {

  let max = 0;
  let currentDay = 0;
  let sellDay = 0;

  let lowest = {};
  let highest = {};

  if (prices[0] < prices[1]) {
    lowest.price = prices[0];
    lowest.day = 0;
    highest.price = prices[1];
    highest.day = 1;
    max = highest.price - lowest.price;
  } else {
    lowest.price = prices[1];
    lowest.day = 1;
    highest.price = prices[0];
    highest.day = 0;
    max = 0;
  }


  for (let currentDay = 2; currentDay < prices.length; currentDay++) {
    // console.log(`currentDay ${currentDay} records:
    // lowest price so far on day ${lowest.day}: ${lowest.price}
    // highest price so far on day ${highest.day}: ${highest.price}
    // `);

    if (lowest.day > highest.day || prices[currentDay] > highest.price) {
      highest.price = prices[currentDay];
      highest.day = currentDay;
      let difference = highest.price - lowest.price;
      if (difference > max) {max = difference};
    }
    if (prices[currentDay] < lowest.price || !lowest.hasOwnProperty("price")) {
      lowest.price = prices[currentDay];
      lowest.day = currentDay;
    }
  }

  return max;
};

// var ex1 = [7,1,5,3,6,4];
// var ex2 = [7,6,4,3,1];
// var ex3 = [0, 1];

// console.log(maxProfit(ex1));
// console.log(maxProfit(ex2));