/*
start 1225 - 203
takeaways
  - solved the logic early. notes from last problem made it very clear you're applying
    logarithmic operation to capacities
  - got hung up on something i shoudl've caught in the algoritm & example stage
      - wrote down the example wrong which led to overlooking an issue in algorithm
  - then missed the minimum capacity from the largest order and had to spend time solving that one
  - overall much better than last example, refine the PEDAC and work slowly, systematically
  - was on pace for a quick solve but got ahead of myself
Problem
  input:
    array of positive integer numbers as `orderVolumes`
    positive integer number as `maxTrips`
  output: integer number representing minimum volume needed
  rules:
    - accept an array of positive integers
      - assume the array is not empty
      - assume it is not sparse
      - length of the array can be 1 or more
      - integers are not sorted
      - numbers can be duplicated
    - accept a positive integer maxTrips
      - assume it will be a number type
      - assume it will be at least 1
    - the elements of orderVolumes represent the cubic volume of orders
    - the orders need to go into a truck of undetermined capacity
    - maxTrips represents the desired maximum number of trips to deliver all packages
    - on each trip the truck will be loaded with as many consecutive orders as possible
      - [6, 3, 8, 2, 5, 4, 5] -> if started at 1, orders 6, 3, 8 ... are loaded in order
      - cannot load the smallest items first
  - objective: find the minimum capacity of the truck needed to complete orders in `maxTrips`
Examples

Data Structure
Thoughts:
  Illustrative Example:
    Input: orderVolumes = [6, 3, 8, 2, 5, 4, 5], maxTrips = 3
    Output: 14
    Explanation: A truck with 14 cubic meters capacity can
                  deliver all orders in 3 trips:
    Trip 1: 6 + 3 = 9 cubic meters
    Trip 2: 8 + 2 = 10 cubic meters
    Trip 3: 5 + 4 + 5 = 14 cubic meters

  - first thing i need to know is total volume -> 33
  - objective if focused on capacities so i should search those to see if they work
    - mid point is 2 + 33 / == 17
  - try the totals with 19 and keep track of trips
     6, 9, 17      2  5,  9,  14
    [6, 3,  8] -> [2, 5,  4,  5]
  - since i have room to take another trip, i can reduce the truck capacity
    - trips is less than max trips, so move end to mid -> 2 + 17 / 2 === 9
    - if trips were more than max, move start to mid
       6  9      8      2  7      4  9
      [6, 3] -> [8] -> [2, 5] -> [4, 5]
  - was more than maxtrips so move up my start
    - mid = 9 + 17 / 2 === 15
       6, 9      8, 10, 15      4, 9
      [6, 3] -> [8,  2,  5] -> [4, 5]
    - this equals maxTrips but capacity can go even smaller
    - criteria for movement is less than or equal to, default to ending capacity as i'm mimizing
    - minimum capacity is updated on each run with mid
    ? run this loop while mid < end
  - with new rules:
    - mid = 12 + 15 / 2 === 13
       6, 9      8, 10      5  9      5
      [6, 3] -> [8,  2] -> [5, 4] -> [5]
  - next:
    - mid = 13 + 15
  Alternate:
    assume above, last step landed on 12 + 16 === 14 mid and solution was 14:
      - start 12
      - mid: 14
      - end 16
       6, 9      8, 10      5  9  5
      [6, 3] -> [8,  2] -> [5, 4, 5]
    next ->
      start: 12
      mid: 13
      end: 14
       6, 9      8, 10      5  9      5
      [6, 3] -> [8,  2] -> [5, 4] -> [5]
    next ->
      start: 14
      mid: 3
      end: 14

  Minimum Capacity issues:
    [10, 20, 30, 40, 50], 5

    1st:
      start: 10
      end: 50
      mid: larger of 50 and 80 -> 80

      [10, 20, 30, 40, 50] -> 1 trip
    2nd:
      start: 10
      end: 80
      mid: larger of 50 and 45 -> 50
      [10, 20, 30, 40, 50] -> 1 trip
    3rd:

  Scrap:
    - running total at each index gives me what
         6, 9, 17, 19, 24, 28, 33
      - [6, 3,  8,  2,  5,  4,  5]

Algorithm repeat:
  - initialize a start
  - initialize an end
  - iterate through array and:
    - set start to min value found
    - add each value to end
  - initialize mid
  - while mid < end
    - initialize truck capacity to 0
    - initialize tripCount
    - loop through array:
      - if truckCapacity > mid
        - set truckCapacity to 0
        - increase tripCount
      - add current value to truckCapacity
    - if tripCount > maxTrips,
      - start = mid + 1
    - else if tripCount is <= maxTrips
      - end = mid
    - assign mid as start + end / 2
  - return mid
*/

function findTruckCapacity(orderVolumes, maxTrips) {
  let start = 0;

  let end = orderVolumes.reduce((total, vol) => {
    start = Math.max(start, vol);
    return total + vol;
  });

  let mid = Math.floor((start + end) / 2);

  while (mid < end) {
    let currentCapacity = 0;
    let tripCount = 1;

    orderVolumes.forEach((vol) => {
      if ((currentCapacity + vol) > mid) {
        currentCapacity = 0;
        tripCount += 1;
      }

      currentCapacity += vol;
    });

    if (tripCount > maxTrips) {
      start = mid + 1;
    } else {
      end = mid;
    }

    mid = Math.floor((start + end) / 2);
  }
  
  return mid;
}

console.log(findTruckCapacity([6, 3, 8, 2, 5, 4, 7], 3) === 15);
console.log(findTruckCapacity([3, 2, 5, 8, 4], 3) === 10);
console.log(findTruckCapacity([1, 2, 3, 4, 5], 1) === 15);
console.log(findTruckCapacity([10, 20, 30, 40, 50], 5) === 50);
console.log(findTruckCapacity([5, 5, 5, 5, 5], 2) === 15);
console.log(findTruckCapacity([7, 3, 9, 4, 2, 8, 6], 2) === 20);
console.log(findTruckCapacity([100], 1) === 100);
console.log(findTruckCapacity([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 3) === 4);
console.log(findTruckCapacity([10, 20, 30, 40, 50], 2) === 90);
console.log(findTruckCapacity([50, 40, 30, 20, 10], 3) === 60);
console.log(findTruckCapacity([5, 10, 15, 20, 25], 1) === 75);
console.log(findTruckCapacity([3, 2, 4, 1, 5], 10) === 5);
console.log(findTruckCapacity([1000, 1000, 1000, 1000], 3) === 2000);

