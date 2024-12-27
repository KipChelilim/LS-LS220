/*
time 1107 - 1221

per usual, overcomplicating the solution
takeaways:
  binary element is not always on the collection. correct to split time complexity into the two
  components, but incorrect in how those operations take place
    - here we needed a linear search for every binary search operation
    - the binary search operation was always going to be length of the array
      - we just typically see this happening based on the elements of the array
*MK   - binary search is focused on length of the array, if the resulting operation can also
*MK     be performed on the elements, then just use the collection itself. but if its not simple
*MK     to reduce the collection itself (getting a slice of an array, etc), then focus
*MK     on reducing the size of the operation. REMEMBER the ultimate goal is to reduce number of N
*MK     operations by half. 
    - the minimum size and knowing the problem is focused on lengths should be a clue to focus on
      the possible lengths not the collection

**Major Keys**
  - O(logN) operations are focused on reducing operations by half. reducing the collection directly
    is just one way to do that. look for other operations that can be halved. example: do not reduce
    array by half, reduce potential lengths by half and still iterate through he array N times
    
  - do not focus on trying to achieve a specific time complexity. focus on solving the problem
    then come back and figure out how that can be achieved
    
  - when EVENTUALLY trying to optimize time complexity, think about how different operations can be
    optimized in combination by trading strategies. example: iterating N times was always required,
    but that didnt mean N operations, then reducing. the linear operation could take place, with
    a logarithmic operation used to put bounds on how much of the array was iterated through during
    each linear operation

  - use the objective to key in on potential alternate approaches to solve a problem. example: we
    wanted MINIMUM LENGTH to produce a SUM. the sum would always require linear operation, so we can
    focus on how to take max possible lengths and reduce it by half on each operation. resulting in
    getting a sum for each N, but making the boundary of that sum logN lengths

Problem:
  input:  `nums` as an array of positive integers, and `target` as a target sum value
  output: single integer
  rules:
    - accept an array of positive integers:
      - assume it will have a length of at least 1
      - assume all elements will be number types
      - assume the array is not sparse
      - array is not sorted
      - array can contain duplicates
    - accept a target sum
      - assume it will not be missing
      - assume it will also be a positive integer
    - objective is to find a contiguous subarray that sums to (or exceeds) `target`
    - if the target is not found return 0
    - if the target is found, return the length of that subarray
    - solution should be O(NlogN)
Data Structure
  subarray slice to run reduce on
  can refactor to do this through a loop to reduce space complexity
Algorithm
  overview:
Thoughts:
  Input: nums = [4, 2, 5, 7], target = 10
  Output: 2
  Explanation: In this example, the shortest subarray that
               meets or exceeds the target sum of 10 is [5, 7].
               This subarray sums to 12, which is greater than
               the target sum of 10. The length of this subarray is 2.
   0  1  2  3
  [4, 2, 5, 7]

    start 0, mid 1, end 3 -> sum through mid is 8
    start 0

  how do i decide when to halve array size -> logN
      
  should only need to sum subarray once on each iteration -> N

  approach One example:
     0  1  2   3  4  5   6  7  8  9  10
    [1, 1, 1, 50, 1, 1, 50, 1, 1, 1, 1], target 100
      start 0, mid 5, end 10
        - start through mid 55
        - end through mid 54
        - start through end 109
        - if together they meet target
          - find min length
      0:
         0  1  2   3  4  5   6  7  8  9  10
        [1, 1, 1, 50, 1, 1, 50, 1, 1, 1, 1], target 100    
         s     l         ^      r        e
        start: 0
        mid left: 2
        mid: 5
        mid right:7
        end: 10
        sum is larger so set min sum to this
        cut off ends
      1: 
         0  1  2   3  4  5   6  7  8  9  10
        [1, 1, 1, 50, 1, 1, 50, 1, 1, 1, 1], target 100    
               s   l  ^  r      e
        start: 2
        mid left: 3
        mid: 4
        mid right: 5
        end: 7
        sum is larger so set min sum to this
        cut off ends
      2: 
         0  1  2   3  4  5   6  7  8  9  10
        [1, 1, 1, 50, 1, 1, 50, 1, 1, 1, 1], target 100    
                   s  ^  e
        start: 3
        mid left: 4
        mid: 4
        mid right: 4
        end: 5
        if start - 1 or end - 1 reaches total return current length + 1
        target not met so do nothing

  approach 2 example:
     0  1  2  3  4  5  6  7  8  9  10
    [0, 2, 0, 0, 0, 0, 0, 0, 8, 0, 0], target 9
           
      0:
         0  1  2  3  4  5  6  7  8  9  10
        [0, 0, 0, 2, 2, 0, 0, 0, 8, 0, 0], target 9
         s     l        ^     r        e
        start: 0
        end: 10
        mid: 5
        
        mid left: 2
        mid right:7
        
        left side sum is 4
        right side sum is 8
        because total does meets success criteria, and i dont have one side that meets criteria
        smallest side i need to find -> (target - larger side)
      1 - r:
         0  1  2  3  4  5  6  7  8  9  10
        [0, 0, 0, 2, 2, 0, 0, 0, 8, 0, 0], target 9
         s     l        ^     r        e
        start: 0
        end: 10
        mid: 5
        
        mid left: 2
        mid right:7
        
        left side sum is 4
        right side sum is 8
        because total does meets success criteria, and i dont have one side that meets criteria
        smallest side i need to find -> (target - larger side)
          
    if one side exceeds target, focus only on that side
    if both sides are needed to exceed target
      get L and R midpoints
      calculate new mid sum
*/



function minLengthForTargetSum(nums, target) {
  // implementation goes here
}

console.log(minLengthForTargetSum([1, 2, 3], 5) === 2);
console.log(minLengthForTargetSum([1, 1, 1], 4) === 0);
console.log(minLengthForTargetSum([8, 2, 1, 4], 8) === 1);
console.log(minLengthForTargetSum([1, 2, 5, 4, 3], 9) === 2);
console.log(minLengthForTargetSum([1, 4, 1, 3, 6, 2], 9) === 2);
console.log(minLengthForTargetSum([1, 2, 3, 4], 10) === 4);
console.log(minLengthForTargetSum([1, 2, 6, 1, 1, 7], 9) === 3);
console.log(minLengthForTargetSum([4, 2, 2, 1, 5, 2], 14) === 5);

// All test cases should log true

