/*
Problem:
  input: array of numbers
  output: majority element
  rules:
    a majority element is a value that is at least half of the elements in an array
    assume any array will only have 1 majority element
    return the majority element of the array
  questions:
    - is there always going to be a majority element
    - will the array every be empty
    - should i consider empty slots in a sparse array when calc-ing majority
    - will the input always be provided
Examples
Data Structure
Initial Algorithm
  - main program:
    - calculate the target number for majority
    - create an object to hold values
    - for each value in the input array
      - increment count of value by 1 in object
      - if count is larger than target, return value
    - return null
  - helpers:
*/

function findMajority(arr) {
  let target = arr.length / 2;
  let valueCounts = {};

  for (let i = 0; i < arr.length; i += 1) {
    let value = arr[i];
    valueCounts[value] ??= 0
    valueCounts[value] += 1
    if (valueCounts[value] >= target) return value;
  }

  return null;
}

console.log(findMajority([6, 4, 4, 6, 4]) === 4);
console.log(findMajority([4, 5, 2, 5, 5, 5, 1]) === 5);
console.log(findMajority([1, 2, 1, 2, 2, 1, 2]) === 2);
console.log(findMajority([1, 2, 3, 1, 4, 4, 1, 1]) === 1);
console.log(findMajority([5, 5, 5]) === 5);