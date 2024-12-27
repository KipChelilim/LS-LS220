/*
time 551 - 703
had the logic early, got hung up on debugging
had the step to clear keys, removed it, never went back to algorithm to think it through again
revisit using examples and algorithm
after looking at solution -> Map is easier to read and less error prone here

Problem
  input: string
  output: integer number
  objective: find the longest substring of only unique characters
  rules:
    accept a string `string`:
      - may contain duplicate characters
      ? will it ever be emtpy?
      ? will  I ever get another data type?
    identify the longest substring without duplicates
    in helloworld
      hel is first substring without duplicates
      el is another
      l is another
      l is a separate one (second l)
      low breaks because of 2nd o
      longest substring is world

Examples
  example groups:
    expected inputs:
      empty string -> given
      1 character -> given
      26 unique -> given
      tie for longest -> given
      single substring is longest -> given
    malformed inputs: assume none
    missing inputs: assume n/a
    extra inputs:
    other edge cases: n/a
  illustrative example
    'helloworld'
     *  ^

    "abcdefghijklmnopqrstuvwxyz"
     *                         ^

Data Structure
  object for quick lookup to see if character has been seen before, with index of first instance
  variable to store current longest substring
Algorithm
  general thoughts/ideas
    runner/anchor
    start both at 0
    if letter is present in object
      get current length (runner - anchor)
      set anchor to first index of duplicate + 1
    if letter is not present
      push runner forward until reaching the end

  main program
    if string.length is 0 return 0

    initialize runner and anchor to 0
    initialize empty object to store letters as keys as `foundLetters`
    initialize length 0

    while runner < length of string
      let current letter equal letter at runner
      if i find a duplicate
        update maxLength length (max of current maxLength and (runner - anchor))
        move anchor past the initial index of the duplicate (foundLetters[currentLetter] + 1)
        clear object and store current anchor

      set foundLetters[currentLetter] = runner
      update maxLength length (max of current maxLength and (runner - anchor))
      runner + 1
*/

function longestSubstringLength(string) {
  let runner = 0;
  let anchor = 0;
  let foundLetters = new Map();
  let maxLength = 0;

  while (runner < string.length) {
    let currentLetter = string[runner];

    if (foundLetters.has(currentLetter)) {
      maxLength = Math.max(maxLength, runner - anchor);
      anchor = foundLetters.get(currentLetter) + 1;
      foundLetters = new Map();
    }

    foundLetters.set(currentLetter, runner);
    runner += 1;
  }

  maxLength = Math.max(maxLength, runner - anchor);
  return maxLength;
}

console.log(longestSubstringLength("a") === 1);
console.log(longestSubstringLength("aa") === 1);
console.log(longestSubstringLength("ab") === 2);
console.log(longestSubstringLength("abba") === 2);
console.log(longestSubstringLength("abc") === 3);
console.log(longestSubstringLength("helloworld") === 5);
console.log(longestSubstringLength("dvdf") === 3);
console.log(longestSubstringLength("tmmzuxt") === 5);
console.log(longestSubstringLength("thisishowwedoit") === 6);
console.log(longestSubstringLength("longestsubstring") === 8);
console.log(longestSubstringLength("aabbccddeffghijklmno") === 10);
console.log(longestSubstringLength("abcdefghijklmnopqrstuvwxyz") === 26);