/*
time 801 - 827

needed the hint since i misread requirements - there is at least one peak, no adjacent hills are
same height. meaning you don't need to sort, you can find a peak by just following the increasing
slope

Problem
  input: array of integers representing heights
  output: index of a peak
  objective: find the index of any peak in the terrain and return it
  rules:
    - accept an array of integers as numbers
      ? can the array be empty -> no
      ? can it be sparse? how should sparse elements be compared -> no
      ? can it contain non number integers? -> no
      ? will all values be greater than 0? -> yes
    - a peak is an element that is greater than its immediate adjacent elements
    - the first and last element can be compared against its only adjacent element
    - a peak must be greater than its adjacent elements, it cannot be equal
    - there are no adjacent elements that are the same (e.g. there won't be 2, 2, 2)
    - any of the peaks found can be returned
    - if there are no peaks, return 0
    - there is guaranteed to be at least one peak + two hills can't be same height
      - moving toward the increasing slope will eventually find a peak

Examples
  example groups:
    good inputs:
      single peak
      no peak
      multiple peaks
      first element is a peak - only one
      last element is a peak - only one
    malformed inputs: n/a
    missing inputs: n/a
    extra inputs: n/a
    other edge cases:
  illustrative example:
    Example:
                        0  1  2  3  4  5
      Input: terrain = [1, 3, 2, 1, 4, 5]
      Output: 1 or 5
      Explanation: Both index 1 (elevation 3) and index 5
                    (elevation 5) are peaks.

      [1, 3, 2, 1, 4, 5]
Data Structure
  just pointers moving
Algorithm
  main program
    initialize pointer as floor of length / 2
    while pointer is < length && greater than or equal to 0
      initialize left to array[pointer - 1] || 0
      initialize right to array[pointer + 1] || 0
      if left is greater than pointer, decrement pointer
      if right is greater than pointer, increase pointer
      else return pointer

*/

function findPeakInTerrain(terrain) {
  let pointer = Math.floor(terrain.length / 2);

  while (pointer >= 0 && pointer < terrain.length) {
    let currentHill = terrain[pointer];
    let leftHill = terrain[pointer - 1] || 0;
    let rightHill = terrain[pointer + 1] || 0;

    if (leftHill > currentHill) {
      pointer -= 1;
    } else if (rightHill > currentHill) {
      pointer += 1;
    } else {
      return pointer;
    }
  }
}

console.log(findPeakInTerrain([1, 2, 1]) === 1);
console.log(findPeakInTerrain([1, 3, 4, 1]) === 2);
console.log(findPeakInTerrain([3, 2, 1]) === 0);
console.log(findPeakInTerrain([1, 2, 3]) === 2);
console.log([1, 4].includes(findPeakInTerrain([1, 3, 2, 1, 5, 4])));
console.log(findPeakInTerrain([1, 2, 3, 4, 5, 7, 3]) === 5);
console.log(findPeakInTerrain([1, 2, 3, 4, 3, 2, 1]) === 3);
console.log([0, 8].includes(findPeakInTerrain([5, 4, 3, 2, 1, 2, 3, 4, 5])));
console.log(findPeakInTerrain([1, 2, 3, 4, 5, 4, 3, 2, 1]) === 4);
console.log(findPeakInTerrain([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]) === 0);
console.log(findPeakInTerrain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === 9);