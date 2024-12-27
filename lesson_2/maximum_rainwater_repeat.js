/*
Imagine a series of vertical barriers arranged in a straight
line at equal distances across a flat field.
These barriers have different heights. After a rainstorm,
water collects between the barriers, forming reservoirs.
Your task is to determine the maximum volume of rainwater
that can be captured between any two barriers, without
the water spilling over the tops of those two barriers.

Write a function `maxRainwater` that takes an array of
barrier `heights` and calculates the maximum volume
of rainwater that can be harvested between any two barriers.

The array `heights` represents the height of each barrier,
where `heights[i]` is the height of the i-th barrier.
The distance between each barrier is uniform.

The input array will contain at least 2 values.

Example:
Input: [1, 2, 1]
Output: 2
Explanation: The distance between the first and
third barrier is 2, and the height is 1, so
the maximum amount of rainfall is 2 * 1 = 2

  |    =>    |
|_|_|      |*|*|

Example:
Input: [2, 3, 4, 2]
Output: 6
Explanation: The distance between the first and
fourth barrier is 3, and the height is 2, so the
maximum amount of rainfall is 3 * 2 = 6

    |            |
  | |    =>    | |
| | | |      |*|*|*|
|_|_|_|      |*|*|*|


Problem
  input: array of integers
  output: single integer representing volume
  objective:
    find max volume of water that can be caught between any two barriers without overflowing
  rules:
    integers in array represent heights of barriers
    barriers are equidistant - length between any adjacent barriers is 1
    water collects between barriers equally
    any water exceeding a barriers height overflows

Examples:
  Input: [1, 2, 1]
    Output: 2
      |    =>    |
    |_|_|      |*|*|
    Explanation: The distance between the first and
    third barrier is 2, and the height is 1, so
    the maximum amount of rainfall is 2 * 1 = 2

  Input: [2, 3, 4, 2]
    Output: 6

        |            |
      | |    =>    | |
    | | | |      |*|*|*|
    |_|_|_|      |*|*|*|
    Explanation: The distance between the first and
    fourth barrier is 3, and the height is 2, so the
    maximum amount of rainfall is 3 * 2 = 6

  Input: [1, 1, 100, 100, 1,...] -> length of 50
    Output: 100

        | |                 |*|
        | |        =>       |*|
        | |                 |*|
    |_|_|_|_|_|...      |_|_|*|_|_|...
    Explanation: Length of 51 means there are 50 1 height reservoirs
    But if there were two 99 length ADJACENT reservoirs, that would be the largest

  Input: [4, 1, 1, 4]
    Output: 12

    |     |      |* * *|
    |     |  =>  |* * *|
    |     |      |* * *|
    |_|_|_|      |*|*|*|
    Explanation: No overflows from the barriers 4 and 4, can overflow within
    This is telling me the answer is the largest area between two heights where
    one is equal to or greater than the other.

  Input: [4, 1, 1, 4]
    Output: 12

    |     |      |* * *|
    |     |  =>  |* * *|
    |     |      |* * *|
    |_|_|_|      |*|*|*|
    Explanation: No overflows from the barriers 4 and 4, can overflow within
    This is telling me the answer is the largest area between two heights where
    one is equal to or greater than the other.

  Input: [3, 1, 2, 5, 2, 4, 2, 5, 6, 1, 5, 3, 2, 3, 4, 1, 2]
    Output: 44
    -----------------------------------
                    |
          |       | |   |
          |   |   | |   |       |
    |     |   |   | |   | |   | |
    |   | | | | | | |   | | | | |   |
    |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|

    arr[0], arr[16]: 3, 2 -> 32
    arr[0], arr[15]: 3, 1 -> 15
    arr[0], arr[13]: 3, 4 -> 42
    arr[1], arr[13]: 1, 4 -> 12
    arr[2], arr[13]: 2, 4 -> 22
    arr[3], arr[13]: 5, 4 -> 44

Data Structure:
  array
  two variable pointers
Algorithm
  general thoughts:
    two pointers from start and end and work from outside in
    trying to compare area between the two pointers
    if one pointer is less than the other -> get area from current index x smallest height
    when do i move a pointer ->
      move the smallest pointer inward
      if both are equal move start inward
    continue until start is === end

  initialize pointers
  initialize maxArea as 0
  while start < end
    get initial area
    maxArea = max of current max area and minimum of start/end * end - start
    if arr[start] is less than array[end] move start forward
    if arr[start] is greater than array[end] move end forward
    if equal move both

  return maxArea
*/

function maxRainwater(barriers) {
  let maxArea = 0;
  let start = 0;
  let end = barriers.length - 1;

  while (start < end) {
    let firstBarrier = barriers[start];
    let secondBarrier = barriers[end];

    let currentArea = Math.min(firstBarrier, secondBarrier) * (end - start);
    maxArea = Math.max(currentArea, maxArea);

    if (firstBarrier === secondBarrier) {
      start += 1;
      end -= 1;
    } else if (firstBarrier < secondBarrier) {
      start += 1;
    } else {
      end -= 1;
    }
  }

  return maxArea;
}

console.log(maxRainwater([1, 1]) === 1);
console.log(maxRainwater([1, 3]) === 1);
console.log(maxRainwater([1, 2, 1]) === 2);
console.log(maxRainwater([2, 3, 4, 2]) === 6);
console.log(maxRainwater([2, 2, 2, 2, 2]) === 8);
console.log(maxRainwater([2, 9, 5, 10, 5, 6]) === 24);
console.log(maxRainwater([5, 4, 3, 2, 9, 10, 3, 4, 5]) === 40);
console.log(maxRainwater([3, 1, 2, 5, 2, 4, 2, 5, 6, 1, 5, 3, 2, 3, 4, 1, 2]) === 44);
console.log(maxRainwater([2, 2, 13, 9, 1, 15, 2, 5, 9, 7, 5, 3, 6, 3, 4, 1, 4, 5]) === 75);