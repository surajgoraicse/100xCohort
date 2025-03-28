/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  }
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/


function doesExist(category, transactions) {
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].category === category) {
      return { index: i, exist: true }
    }
  }
  return { index: -1, exist: false };
}

function calculateTotalSpentByCategory(transactions) {

  let output = []
  transactions.forEach(element => {
    const check = doesExist(element.category, output)
    if (!check.exist) {
      output.push({ category: element.category, totalSpent: element.price })
    } else {
      output[check.index].totalSpent += element.price
    }
  });

  return output;
}


module.exports = calculateTotalSpentByCategory;


