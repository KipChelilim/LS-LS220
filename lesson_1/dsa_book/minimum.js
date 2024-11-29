/*
Problem
  input: array of numbers sorted in ascending order
  output: minimum value between the count of positive integers and the count of negative integers
  rules:
    accept an array of integers
      integers will be sorted smallest to largest
      integers can be positive negative or zero
      array can be empty
    identify the count of positive integers
    identify the count of negative integers
    return the minimum of those two numbers
    if there are no positive or negative numbers, the count is 0
Examples
  - [-4, -3, -2, -1, 3, 4] === 2
    - last negative num idx === 3, 3-0 + 1 === count of 4
    - first positive num === next value if its not 0, else idx + 2
    - positive count === last idx - first positive idx
      - 5 - 4 + 1
Algorithm
  initialize start, end and midpoints
  search for first negative num idx
  search for last negative num idx
  if there is no first negative value or last negative num is the last index, return 0
  set first positive idx
    if next value is 0, set it to idx + 2
    else idx + 1
  return minimum of (last neg - first neg or last pos - first pos) + 1
*/

function minimumCount(array) {
  let firstNegativeIdx = array[0] < 0 ? 0 : null;
  let lastNegativeIdx = findFirstOrLastIndex(array, -1, 'last');

  if (firstNegativeIdx === null || lastNegativeIdx === array.length - 1) return 0;

  let firstPositiveIdx = lastNegativeIdx + 1;
  while (array[firstPositiveIdx] === 0) {
    firstPositiveIdx += 1;
  }

  let negativeCount = lastNegativeIdx + 1;
  let positiveCount = array.length - firstPositiveIdx;

  return Math.min(positiveCount, negativeCount);
}

function findFirstOrLastIndex(array, searchValue, side) {
  let start = 0;
  let end = array.length - 1;

  while (start < end) {
    if (side === 'first') midpoint = Math.floor((start + end) / 2);
    if (side === 'last') midpoint = Math.ceil((start + end) / 2);

    if (array[midpoint] > searchValue) {
      end = midpoint - 1;
    } else if (array[midpoint] < searchValue) {
      start = midpoint + 1;
    } else {
      if (side === 'first') end = midpoint;
      if (side === 'last') start = midpoint;
    }
  }

  return array[start] <= searchValue ? start : null;
}

// Given an array `nums` sorted in ascending order, determine
// the minimum between the count of positive integers and the
// count of negative integers.

// Please note that the number `0` is neither positive nor negative.

console.log(minimumCount([-4, -3, -2, -1, 3, 4]) === 2);
console.log(minimumCount([-3, 1, 2, 3, 4, 5]) === 1);
console.log(minimumCount([-5, -4, -3, -2, -1]) === 0);
console.log(minimumCount([1, 2, 3, 4, 5]) === 0);
console.log(minimumCount([-2, -1, 1, 2]) === 2);
console.log(minimumCount([-7, -5, -4, 1, 2, 6, 10]) === 3);
console.log(minimumCount([-3, -2, -1, 0, 5, 6]) === 2);
console.log(minimumCount([-1, 0, 1]) === 1);
console.log(minimumCount([]) === 0);

// All test cases should log true.

// minimumCount([-7, -5, -4, 1, 2, 6, 10]);