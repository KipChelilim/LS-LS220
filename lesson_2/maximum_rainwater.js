/*
time 125 - 239
didn't need hint, but needed walkthrough to get past misunderstanding an edge case
got stuck solving my logic on one of the examples
redo this one when you go back through problems

Imagine a series of vertical barriers arranged in a straight
line at equal distances across a flat field.
These barriers have different heights. After a rainstorm,
water collects between the barriers, forming reservoirs.
Your task is to determine the maximum volume of rainwater
that can be captured between any two barriers,
without the water spilling over any of the tops.

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

Problem:
  input: array of numbers representing heights
  output: number indicating volume of water
  rules:
    - vertical barriers are arranged in a straight line:
      - barriers are all equidistant
      - barriers are of varying heights
      - visual example:
                        |        |
          start -->  |  |  |  |  |  |
        - example has 5 barriers
        - first barrier is height 1, 2nd is height 2, third is height 1, etc
        - barriers can be of any height, they are not arranged shortest, to tallest etc
    - accept an array representing barrier heights:
      ? each element is a number
      ? will the array ever be sparse?
      ? will the array ever be emtpy?
      ? each number is a positive integer greater than 0
      - numbers are not sorted in any order
    - the volume between to barriers is equal to their distance times the min height of the two
      - ex: in the 2nd example provided, each reservoir can contain 1 * min height
        - first reservoir === 1 * 2 but not 1 * 3
        - second reservoir === 1 * 3 but not 4
        - etc
    - function should identify the volume between any set of reservoirs, but limit to volume that
      doesn't spill over any barrier
    - max volume is :
      - min height * length of array - 1
      - plus each run of volumes that does not decrease
Examples:
  - 1, 1, ..... 100 and it ends with 9, 9, 9 -> 100 ones results in volume of 99 vs vol of 18
  - but if it was 18 1s, overfilling those is fine because vol of 17 is less than vol of 18 from 9s

  expected inputs:
    - 1 reservoir -> given
    - more than 1 -> given

    - minimum height yields largest reservoir (i.e. can't overflow any) -> given
    - min height does not yield largest (i.e. prioritize subset of barriers)

Algorithm

*/
function maxRainwater(barriers) {
  let start = 0;
  let end = barriers.length - 1;
  let maxVolume = 0;

  while (start < end) {
    let currVolume = Math.min(barriers[start], barriers[end]) * (end - start);
    maxVolume = Math.max(currVolume, maxVolume);
    if (maxVolume === 44) {
      console.log (`start: ${start}, height: ${barriers[start]}`);
      console.log (`end: ${end}, height: ${barriers[end]}`);
      return;
    }
    if (barriers[start] < barriers[end]) {
      start += 1;
    } else {
      end -= 1;
    }
  }

  return maxVolume;
}

// console.log(maxRainwater([1, 1]) === 1);
// console.log(maxRainwater([1, 3]) === 1);
// console.log(maxRainwater([1, 2, 1]) === 2);
// console.log(maxRainwater([2, 3, 4, 2]) === 6);
// console.log(maxRainwater([2, 2, 2, 2, 2]) === 8);
// console.log(maxRainwater([2, 9, 5, 10, 5, 6]) === 24);
// console.log(maxRainwater([5, 4, 3, 2, 9, 10, 3, 4, 5]) === 40);
console.log(maxRainwater([3, 1, 2, 5, 2, 4, 2, 5, 6, 1, 5, 3, 2, 3, 4, 1, 2]) === 44);
// console.log(maxRainwater([2, 2, 13, 9, 1, 15, 2, 5, 9, 7, 5, 3, 6, 3, 4, 1, 4, 5]) === 75);