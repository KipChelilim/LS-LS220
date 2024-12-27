/*
time 653 - 813
no hint or solution, but pedac and algorithm was rusty after the break
improve debugging - bug was small, but couldn't see, went down rabbit hole and started hack n slashing
revisit more runner/anchor problems


Problem:
  input:
    array of numbers `nums`
    target number `target`
  output: length of contiguous subarray that meets objective as number
  objective: find the minimum subarray that can sum to or exceed the `target`
  rules:
    accept array of numbers `nums`
      ? can array be emtpy -> no
      ? can array be sparse? -> no
      ? will there be negative numbers? -> no
      ? can there be other elements other than a number? -> no
    accept a number `target`
      ? will it always be an integer -> yes
      ? will it always be a number type -> yes
      ? can it ever be omitted? -> no
    find a contigouous subarray that can sum to or exceed the `target`
    if the target is present, the subarray should be length 1
    if there is no subarray that can meet the `target`, return 0
Example
  exploration:
    Input: nums = [4, 2, 5, 7], target = 10
    Output: 2
    Explanation: In this example, the shortest subarray that
                  meets or exceeds the target sum of 10 is [5, 7].
                  This subarray sums to 12, which is greater than
                  the target sum of 10. The length of this
                  subarray is 2.
  example groups:
    good inputs:
      target is present -> given
      shortest length is 2 -> exploration example
      shortest length is at the end, but start has a valid length -> exploration example
      shortest length longer than 2 -> given
      not present -> given
      nums length 1 -> new
    malformed inputs:
      assume answer is no for malformed input questions
    missing inputs:
      assume no missing inputs
    extra inputs:
      assume no extra inputs
    invalid inputs:
      assume all valid inputs provided
    other special cases:
      array length of 1
Data Structure
  two pointers, avoid subarrays or slices
Algorithm
  general thoughts:
    once you find subarray of length 2, you only need to search if the target is present
    you should start with two pointers at start and start + 1, then return if largest meets target
    increase runner pointer until:
      sum meets or exceeds target
        if length is 2, stop runner movement
        otherwise, decrease sum & move anchor by 1
      runner reaches end without finding sum
        return 0 cause its not possible

    parent loop is while anchor < runner
      inside check for target
      loop your runner
      loop your anchor

  main program
    initialize anchor to 0;
    initialize runner to 1;
    initialize minLength to 0;
    initialize sum = anchor + runner;

    if (array.length === 1 && anchor < target) return 0;
    if (array.length === 1 && anchor > target) return 1;
    while anchor is < runner
      check if target is in first two and return 1

      while runner is less than last index && sum < target
        move runner
        add current value to sum
      end

      if i'm below target return minLength;
      else set minLength equal to distance between pointers + 1

      move anchor
      decrease sum

    return minLength
*/


function minLengthForTargetSum(nums, target) {
  let anchor = 0;
  let runner = 1;
  let minLength = 0;
  let sum = nums[anchor] + nums[runner];

  if (nums.length === 1 && nums[0] >= target) return 1;
  if (nums.length === 1 && nums[0] < target) return minLength;

  while (anchor < runner) {
    if (Math.max(nums[anchor], nums[runner]) >= target) return 1;

    while (runner < nums.length - 1 && sum < target) {
      runner += 1;
      sum += nums[runner];
    }

    if (sum < target) break;

    minLength = runner - anchor + 1;
    sum -= nums[anchor];
    anchor += 1;
  }

  return minLength;
}

console.log(minLengthForTargetSum([1, 2, 3], 5) === 2);
console.log(minLengthForTargetSum([1, 1, 1], 4) === 0);
console.log(minLengthForTargetSum([8, 2, 1, 4], 8) === 1);
console.log(minLengthForTargetSum([1, 2, 3, 4, 5], 9) === 2);
console.log(minLengthForTargetSum([1, 4, 1, 3, 6, 2], 9) === 2);
console.log(minLengthForTargetSum([1, 2, 3, 4], 10) === 4);
console.log(minLengthForTargetSum([1, 2, 6, 1, 1, 7], 9) === 3);
console.log(minLengthForTargetSum([4, 2, 2, 1, 5, 2], 14) === 5);
console.log(minLengthForTargetSum([4], 14) === 0);
console.log(minLengthForTargetSum([4], 4) === 1);
