/*
Problem
  input: positive integer
  output: sum of integers 1 to n, inclusive
  rule:
    accept a positive integer n
    calculate the sum of the first n natural numbers
    natural number definition:
      positive integer
      starting from 1
Algorithm
  recursive definition:

*/

function sumOfNaturalNumbers(n) {
  if (n < 1) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return n + sumOfNaturalNumbers(n - 1);
  }
}

// Create a function that calculates the sum of the first `n`
// natural numbers. A natural number is a positive integer
// starting from 1. Therefore, the sum of the first `n` natural
// numbers is the sum of all integers from 1 to `n`.

// For example, if `n` is 5, the sum would be 1 + 2 + 3 + 4 + 5 == 15.

console.log(sumOfNaturalNumbers(1) === 1);
console.log(sumOfNaturalNumbers(5) === 15);
console.log(sumOfNaturalNumbers(10) === 55);
console.log(sumOfNaturalNumbers(20) === 210);
console.log(sumOfNaturalNumbers(0) === 0);

// All test cases should log true.