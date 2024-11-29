/*
Problem:
  input: array of integers, sorted smallest to largest
  output: count of distinct numbers
  rules:
    accept a sorted array of integers
    reorder the array with all distinct elements at the front
    ignore all elements after distinct ones
    return count of distinct elements
Algorithm:
  initialize anchor to 1
  initialize runner to 2
  initialize last distinct value to 0
  loop through
    if runner greater than last distinct value, swap and move anchor forward
  move runner forward

examples:
       L  A  R
       |  |  |
      [3, 3, 5, 7, 7, 8] -> [3, 5, 3, 7, 7, 8]

          L  A  R
          |  |  |
      [3, 5, 3, 7, 7, 8] -> [3, 5, 7, 3, 7, 8]

             L  A  R
             |  |  |
      [3, 5, 7, 3, 7, 8] -> [3, 5, 7, 3, 7, 8]

             L  A     R
             |  |     |
      [3, 5, 7, 3, 7, 8] -> [3, 5, 7, 3, 7, 8]

A/R Rules
  when do i move anchor
    - when i find a new distinct value
  when do i move my runner
    - after every iteration
  how do i track distinct values
    - current value or just value at anchor minus 1

*/

function compressToDistinct(array) {
  let anchor = 1;
  let runner = 2;
  let lastDistinctValue = array[0];

  for (; runner < array.length; runner += 1) {
    if (array[runner] > lastDistinctValue) {
      lastDistinctValue = array[runner]
      array[anchor] = lastDistinctValue;
      anchor += 1;
    }
  }

  return anchor;
}

function testCompressToDistinct(array, expectedLength) {
  const originalReference = array;
  const resultLength = compressToDistinct(array);
  const isSameObject = originalReference === array;
  const isLengthCorrect = resultLength === expectedLength;
  const isModifiedCorrectly = array.slice(0, expectedLength).every((val, idx, arr) => idx === 0 || val > arr[idx - 1]);

  return isSameObject && isLengthCorrect && isModifiedCorrectly;
}

console.log(testCompressToDistinct([3, 3, 5, 7, 7, 8], 4));
console.log(testCompressToDistinct([1, 1, 2, 2, 2, 3, 4, 4, 5], 5));
console.log(testCompressToDistinct([0], 1));
console.log(testCompressToDistinct([-5, -3, -3, -1, 0, 0, 0, 1], 5));
console.log(testCompressToDistinct([6, 6, 6, 6, 6, 6, 6], 1));