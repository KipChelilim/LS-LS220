/*
time 830 - 923

had the bulk of it early but needed to go back to the binary search template to fi
start & end updates - too much hack n slashing

Problem
  input: array of integer numbers
  output: maximum number in the array
  objective: find the maximum number in an array that started sorted and has been rotated
  rules:
    accept an array of integer numbers types
      assume array will not be empty
      array can have a single element
      array will not be sparse
      array was previously sorted, but as been rotated an unknown number of times
        e.g. original array [1, 2, 3, 4, 5] might now be [3, 4, 5, 1, 2] or [4, 5, 1, 2, 3]
    distance between elements in the array is unknown
    greatest number is the number greater than its right neighbor

Examples:
  illustrative examples
    Input: nums = [8, 9, 10, 2, 5, 6]
    Output: 10
    Explanation: The original sorted array [2, 5, 6, 8, 9, 10]
                  was rotated 3 times.

            0  1  2   3  4  5
    start: [8, 9, 10, 2, 5, 6]

Data Structure
  pointer
Algorithm
  initialize start to 0
  initialize end array.length - 1
  initialize pointer
  while array[pointer] is valid
    assign pointer to floor of end + start / 2
    if current value is greater than its right neighbor return the value
    if current value is larger than end value, set start to pointer
    if current value is larger than start value, end equal to pointer
*/

function findMax(nums) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (nums[mid] > nums[mid + 1] || (start === end)) {
      return nums[mid];
    } else if (nums[mid] >= nums[start]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
}

console.log(findMax([8, 9, 10, 2, 5, 6]) === 10);
console.log(findMax([15, 18, 2, 3, 6, 12]) === 18);
console.log(findMax([7, 8, 2, 3, 4, 5, 6]) === 8);
console.log(findMax([3, 1]) === 3);
console.log(findMax([5]) === 5);
console.log(findMax([9, 10, 11, 12, 13, 14, 15, 1, 2, 3]) === 15);
console.log(findMax([4, 5, 1, 2, 3]) === 5);
console.log(findMax([23, 34, 38, 40, 41, 14, 15, 16, 17, 18, 19, 20, 21]) === 41);
console.log(findMax([100, 200, 300, 400, 500]) === 500);
console.log(findMax([45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 44]) === 63);
console.log(findMax([11, 13, 15, 17, 19, 21, 1, 3, 5, 7, 9]) === 21);
