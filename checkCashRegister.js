/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the
first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as
the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due,
or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if
it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills,
sorted in highest to lowest order, as the value of the change key.

*/

// not added, but an improvement to this might be that cid would look like this per array element
// CONST PENNYVALUE = 0.01;
// [["PENNY", 0.51, PENNYVALUE]
function checkCashRegister(price, cash, cid) {
  let change;
  let changeOwed = cash - price;

  const INSUFFICIENT_FUNDS = {status: "INSUFFICIENT_FUNDS", change: []};
  let closed = {status: "CLOSED", change: cid};
  let open = {status: "OPEN" };
  let cidTotal = 0;

  // calculate change owed
  for (let denomination = 0; denomination < cid.length; denomination++) {
    cidTotal= cidTotal + cid[denomination][1];
  }

  // calculate cid total.  if cid is less than owed, return insufficient funds status.
  // if cid and owed is the same, return the closed status and the cid array

  if (changeOwed > cidTotal) { return INSUFFICIENT_FUNDS};
  if (changeOwed === cidTotal) { return closed};

  // if correct change is available, return open status and change amount
  let changeReturn = [];
  let cidCounter = cid.length - 1;

  while (changeOwed > 0 && cidCounter >= 0) {
    let dValue = denominValue(cid[cidCounter][0]);
    let compartment = cid[cidCounter][1];
    if (compartment <= changeOwed) {
      changeOwed = Number(changeOwed - cid[cidCounter][1]).toFixed(2);
      changeReturn.push([cid[cidCounter][0], cid[cidCounter][1]]);
    } else if (compartment > changeOwed && changeOwed >= dValue) { // compartment is more.  i.e. 80 in compartment, 64 change needed
      let dAmount = Math.floor(changeOwed/dValue);
      changeOwed = Number(changeOwed - (dAmount * dValue)).toFixed(2);
      compartment = compartment - (dAmount * dValue);
      let arr = [cid[cidCounter][0], dAmount * dValue];
      changeReturn.push(arr)

    }
    // subtract the dValue from changeOwed and the compartment and add it to changeReturn until either is 0

    cidCounter--;
  }



  function denominValue(denomName) {
    switch(denomName) {
      case "PENNY":
        return 0.01;
        break;
      case "NICKEL":
        return 0.05;
        break;
      case "DIME":
        return 0.10;
        break;
      case "QUARTER":
        return 0.25;
        break;
      case "ONE":
        return 1;
        break;
      case "FIVE":
        return 5;
        break;
      case "TEN":
        return 10;
        break;
      case "TWENTY":
        return 20;
        break;
      case "ONE HUNDRED":
        return 100;
        break;
      default:
        return;
    };
  }


  if (changeOwed == 0) {
    open.change = changeReturn;
    return open;
  }

  // otherwise, return insufficient funds
  return INSUFFICIENT_FUNDS;
}






// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1],
// ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

// later, improve on the tests by testing equality of the objects
const INSUFF_FUNDS = JSON.stringify({status: "INSUFFICIENT_FUNDS", change: []});

let test1 = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1],
  ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log(`\nTest1: expect {status: "OPEN", change: [["QUARTER", 0.5]]}\n
  result: ${JSON.stringify(test1) === JSON.stringify({status: "OPEN", change: [["QUARTER", 0.5]]})}\n
  return value ${JSON.stringify(test1)}
  expected     ${JSON.stringify({status: "OPEN", change: [["QUARTER", 0.5]]})}\n`);


let test2 = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1],
  ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log(`\nTest2: expect {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20],
  ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.\n
  result: ${JSON.stringify(test2) === JSON.stringify({status: "OPEN", change: [["TWENTY", 60], ["TEN", 20],
  ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]})}
`);

let test3 = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0],
["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
console.log(`\nTest3: expect {status: "INSUFFICIENT_FUNDS", change: []}\n
  result: ${JSON.stringify(test3) === INSUFF_FUNDS}\n`);


let test4 = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0],
["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

console.log(`Test4: expect true for insufficient funds\n
  result: ${JSON.stringify(test4) === INSUFF_FUNDS}\n`);


// let test5 = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0],
//   ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

//   console.log(`\nTest5: expect true for closed\n
//   result: ${JSON.stringify(test5) === JSON.stringify(
//     {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0],
//   ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0],
//   ["ONE HUNDRED", 0]]})}`);

let test6 = checkCashRegister(19.5, 380, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1],
  ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 400]]);

console.log(`\nTest6: expect {status: "OPEN", change: [["QUARTER", 0.5]]}\n
  result: ${JSON.stringify(test6) === JSON.stringify({status: "OPEN",
  change: [["ONE HUNDRED", 300], ["TWENTY", 60], ["QUARTER", 0.5]]
  })}
  return value ${JSON.stringify(test6)}
  expected     ${JSON.stringify({status: "OPEN",
  change: [["ONE HUNDRED", 300], ["TWENTY", 60], ["QUARTER", 0.5]]
  }
)}\n`);
