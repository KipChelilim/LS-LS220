/*
Implement a function `findRange` that takes in an array of
integers sorted in ascending order. The function should
return an array containing the starting and ending
positions of the number 3 within the array. If the number 3
is not found, return [-1, -1].

Example:
Input: nums = [1, 2, 3, 3, 3, 3, 3, 4, 5]
Output: [2, 6]

Example:
Input: nums = [1, 2, 5, 5, 6, 9, 10]
Output: [-1, -1]

Algorithm
  - initialize range as [-1, -1]

  - starting range / leftmost: while start is less than or equal to end
    - set midpoint floor
    - if midpoint:
      - is greater than three set end point to mid point - 1
      - is equal to 3 set end to midpoint
      - is less than 3, set start to midpoint + 1

 S           M           E
 |           |           |
[1, 2, 3, 3, 4, 4, 4, 4, 5]

 S     M     E
 |     |     |
[1, 2, 3, 3, 3]

 S  M  E
 |  |  |
[1, 2, 3]

3

 S        M           E
 |        |           |
[1, 2, 3, 3, 3, 3, 4, 5]


 S  M     E
 |  |     |
[1, 2, 3, 3]

 S  E
 |  |
[3, 3]
*/

function findRangeOfThrees(array) {
  let leftMostIndex = findFirstIndex(array, 'left');
  let rightMostIndex = findFirstIndex(array, 'right');

  return [leftMostIndex, rightMostIndex];
}

function findFirstIndex(array, side) {
  let start = 0;
  let end = array.length - 1;

  while (start < end) {
    if (side === 'left') midpoint = Math.floor((start + end) / 2);
    if (side === 'right') midpoint = Math.ceil((start + end) / 2);

    if (array[midpoint] > 3) {
      end = midpoint - 1;
    } else if (array[midpoint] < 3) {
      start = midpoint + 1;
    } else {
      if (side === 'left') end = midpoint;
      if (side === 'right') start = midpoint;
    }
  }

  return array[start] === 3 ? start : -1
}

console.log(findRangeOfThrees([1, 2, 3, 3, 3, 3, 3, 4, 5])); // [2, 6]
console.log(findRangeOfThrees([1, 2, 3, 3, 3, 3, 3, 5]));
console.log(findRangeOfThrees([1, 2, 5, 5, 6, 9, 10]));      // [-1, -1]
console.log(findRangeOfThrees([3, 3, 3, 3, 3, 3]));
console.log(findRangeOfThrees([]));                          // [-1, -1]