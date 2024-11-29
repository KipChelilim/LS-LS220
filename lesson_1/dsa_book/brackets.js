/*
Problem:
  input: string of brackets
  output: boolean indicating if all brackets are matched correctly
  rules:
    accept a string containing brackets:
      - possible bracket types: [ { (
    test if bracket pairs are matched correctly
      - bracket pair starts with an opening bracket
        -valid: [], [[[]]], [[(({{}}))]]
        - invalid: ][, []][], [[[[[)(]]]]]
      - each bracket pair has a closing bracket
      - each pair is nested properly
    if all pairs are matched correctly
      return true
      else return false
Examples
  - single pairs
    - ()
    - []
    - {}
  - nested pairs
    - (({{}}))
    - ([{}])
  - non-nested sequences:
    - [](){}
  - all but one pair
    - (){[]
    - ()][]
  - invalid opening sequence
    - ][(){}
Data Structure:
  - queue in an array
  - object for each brace type for status, number opened
  - regex to test character type

Algorithm:
  - initialize stack: []
  - initialize coonstants for each type
    - openbrackets
    - parens
    - curly
    - square
  - split string into arr of chars
  - for each index from start
    - if first value is not an open char, return false
    - if char is
      - open char:
        - push char onto stack
      - closed char:
        - pop from stack
        - if doesn't make a pair return false
  - return arr.length === 0;
*/

// Write a function `areMatched` that takes a string as an argument
// and returns true if all types of brackets (parentheses (),
// square brackets [], and curly braces {}) in the string are
// properly matched. For the brackets to be considered
// matched, every opening bracket must have a corresponding
// closing bracket of the same type, and the brackets must be
// correctly nested.

function areMatched(string) {
  let stack = [];
  const openBracketsRegex = /[[{(]/;
  const bracketPairRegex = /(\(\)|\[\]|{})/;

  if (string.length === 0) return true;
  if (!openBracketsRegex.test(string[0])) return false;

  for (let idx = 0; idx < string.length; idx += 1) {
    let char = string[idx]
    if (openBracketsRegex.test(char)) {
      stack.push(char)
    } else {
      let pair = stack.pop() + char;
      if (!bracketPairRegex.test(pair)) return false;
    }
  }

  return stack.length === 0;
}

console.log(areMatched("()"));              // Output: true
console.log(areMatched("([()]{})"));        // Output: true
console.log(areMatched("([((}]({}))"));     // Output: false
console.log(areMatched("{{[[(())]]}}"));    // Output: true
console.log(areMatched(""));                // Output: true
console.log(areMatched("([)]"));            // Output: false