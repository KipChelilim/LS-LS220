/*
Problem
  input: list of numbers in an array
  output: pair of numbers that add up to 10 in an array
  rules:
    accept an array containing a lis of numbers
      the numbers can be positive or negative
    find a pair of numbers that add up to 10
      there will be exactly one pair or no pairs at all
    if there are no pairs return null
    otherwise return the pair in an array
  questions:
    should the pair be returned in the order found?
    will the input every be empty?
    will the input always have number values
    will the input ever be missing
    will the input ever have less than 2 values
Examples:
  expected input: array of positive and negatives all number values
    - two positives -> given
    - positive and negative -> given
    - no pairs -> given
  malformed inputs: n/a
  missing inputs: n/a
  extra inputs: n/a
  other edge cases: tbd
Data structure:
  input: array
  output: 2 element array
  intermediate:
    subarrays containing all pairs
Algorithm:
  get array of all pairs
  iterate through pairs
    if sum is equal to 10, return pair

  pairs:
    initialize results array
    for each index up to 2nd to last element
      iterate through idx + 1 up to last element
        push both nums to results array
    return results array
*/

// function findPair(nums) {
//   let numberPairs = pairs(nums);

//   for (let i = 0; i < numberPairs.length; i += 1) {
//     let sum = numberPairs[i][0] + numberPairs[i][1];
//     if (sum === 10) return numberPairs[i];
//   }

//   return null;
// }

// function pairs(nums) {
//   let results = [];

//   nums.forEach((firstNum, i) => {
//     if (!nums[i + 1]) return;

//     nums.slice(i + 1, nums.length).forEach((secondNum) => {
//       results.push([firstNum, secondNum]);
//     });
//   });

//   return results;
// }

// function findPair(nums) {
//   for (let i = 0; i < nums.length; i += 1) {
//     let deltaTo10 = 10 - nums[i];
//     let indexOfPair = nums.indexOf(deltaTo10)
//     if (indexOfPair > 0 && indexOfPair !== i) return [nums[i], nums[indexOfPair]];
//   }

//   return null;
// }

// post DSA book, second solution

function findPair(nums) {
  let potentialPairLookup = new Set();

  for (let i = 0; i < nums.length; i += 1) {
    let deltaTo10 = 10 - nums[i];
    if (potentialPairLookup.has(deltaTo10)) {
      return [deltaTo10, nums[i]]
    } else {
      potentialPairLookup.add(nums[i]);
    }
  }

  return null;
}

console.log(findPair([2, 3, 9, 7])); // Output: [3, 7]
console.log(findPair([10, 6, -1, 2])); // null
console.log(findPair([1, 2, 5, 6])); // null
console.log(findPair([1, 3, 6, 10, 4, 5])); // [6, 4]
console.log(findPair([4, -5, 3, 15, 5])); // [-5, 15]