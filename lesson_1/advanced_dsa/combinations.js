/*
Create a function `combinations` that takes an array of integers and an
integer, k, and returns all possible combinations of k numbers chosen
from the array. The input array will contain at most 20 numbers.

Example:
Input: nums = [1,2,3,4], k = 2
Output: [
  [1,2], [1,3], [1,4], [2,3], [2,4], [3,4]
]

Algorithm
  naive
    stop criteria:
      candidate length === k
        success
          each value is unique
            for each elem
              if indexOf() !== lastIndexOf() return false
            return true
          group of values is unique from other results
            isUniqueCombination(result, candidate)
              for (let solution of results)
                if result.sort.join() == candidate.sort.join() return false
              return true
      fail
  optimizations
    dead-end criteria
    reducing state space
      - slice out first element after its done iteration
      - update stop condiditon to when candidates.length < k

*/

function combinations(nums, k) {
  function isUnique(numsArr) {
    for (let num of numsArr) {
      if (numsArr.indexOf(num) !== numsArr.lastIndexOf(num)) return false;
    }
    return true;
  }

  function isUniqueCombination(potentialCandidate, results) {
    let potentialCandidateString = potentialCandidate.slice().sort((a, b) => a - b).join();
    for (let solution of results) {
      if (solution.slice().sort((a, b) => a - b).join() === potentialCandidateString) {
        return false
      }
    }
    return true;
  }

  function backtrack(candidates, candidate, results) {
    if (candidate.length === k) {
      results.push([...candidate]);
      return;
    }

    candidates.forEach((elem, idx) => {
      let remainingElements = candidates.slice(idx + 1);
      candidate.push(elem);
      backtrack(remainingElements, candidate, results);
      candidate.pop();
    });
  }

  let results = [];
  let candidate = [];
  backtrack(nums, candidate, results);
  return results;
}


function testCombinations(nums, k, expectedLength) {
  const result = combinations(nums, k);
  if (result.length !== expectedLength) return false;

  const stringifiedCombs = result.map(JSON.stringify);
  const uniqueCombs = new Set(stringifiedCombs);
  return uniqueCombs.size === expectedLength;
}

// Test Cases:
console.log(testCombinations([1,2,3,4], 2, 6)); // C(4,2) = 6
console.log(testCombinations([1,2,3,4,5], 3, 10)); // C(5,3) = 10
console.log(testCombinations([1,2,3,4,5,6], 4, 15)); // C(6,4) = 15
console.log(testCombinations([1,2,3,4,5,6,7], 3, 35)); // C(7,3) = 35
console.log(testCombinations([1,2,3,4,5,6,7,8], 5, 56)); // C(8,5) = 56
console.log(testCombinations([...Array(10).keys()].map(x => x + 1), 6, 210)); // C(10,6) = 210
console.log(testCombinations([...Array(20).keys()].map(x => x + 1), 10, 184756)); // C(20,10) = 184,756

// let uniqueTest1 = [1, 2, 3];

// combinations([1,2,3,4], 2);