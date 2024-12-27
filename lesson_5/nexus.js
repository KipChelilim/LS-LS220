/*
You're keeping score for a futuristic game called "Nexus Surge."
In this game, players accumulate points in unusual ways. At the
start of each round, you begin with an empty scoreboard.

You receive a sequence of scoring actions as an array of strings.
Each action in the sequence is one of the following:

  -  An integer x:
      - Add a new score of x points to the scoreboard.
  - '+':
      - Add a new score that is the sum of the two most recent scores.
  - '*':
      - Add a new score that is double the most recent score.
  - '-':
      - Remove the most recent score from the scoreboard.

Create a function `nexusSurge` that calculates and returns the sum
  of all scores on the scoreboard after applying all the given actions.

The input will be an array of valid operations.

For operation "+", there will always be at least two previous scores on the record.
For operations "*" and "-", there will always be at least one previous score on the record.

Problem
  input: series of tokens
  output: sum of all scores after actions complete
  rules:
    accept a series of characters reprsenting tokens
      assume all tokens are valid
      assume tokens are provided as strings within an array
      assume array will not be sparse or empty
    the following tokens can be provided with the following actions required
      an number N: add the number to the scoreboard
        assume it is always a number type provided as a string
      '-': remove the prevous score from the scoreboard
      '*': multiple the prior score by 2 and add the result to the scoreboard
      '+': add the prior two scores together and add the result to the scoreboard
    the function should return the sum of all scores after processing the tokens
Examples:
  Example 1:

  Input: actions = ["7","3","-","*","+"]
  Output: 42
  Explanation:
  "7" - Add 7 to the scoreboard, scoreboard is now [7].
  "3" - Add 3 to the scoreboard, scoreboard  is now [7, 3].
  "-" - Remove the previous score, scoreboard is now [7].
  "*" - Add 2 * 7 = 14 to the scoreboard, scoreboard is now [7, 14].
  "+" - Add 7 + 14 = 21 to the scoreboard, scoreboard is now [7, 14, 21].
  The total sum is 7 + 14 + 21 = 42.

  Example 2:

  Input: actions = ["8","-3","6","-","*","12","+","+"]
  Output: 35
  Explanation:
  "8" - Add 8 to the scoreboard, scoreboard is now [8].
  "-3" - Add -3 to the scoreboard, scoreboard is now [8, -3].
  "6" - Add 6 to the scoreboard, scoreboard is now [8, -3, 6].
  "-" - Remove the previous score, scoreboard is now [8, -3].
  "*" - Add 2 * -3 = -6 to the scoreboard, scoreboard is now [8, -3, -6].
  "12" - Add 12 to the scoreboard, scoreboard is now [8, -3, -6, 12].
  "+" - Add -6 + 12 = 6 to the scoreboard, scoreboard is now [8, -3, -6, 12, 6].
  "+" - Add 12 + 6 = 18 to the scoreboard, scoreboard is now [8, -3, -6, 12, 6, 18].
  The total sum is 8 + (-3) + (-6) + 12 + 6 + 18 = 35.

  Example 3:

  Input: actions = ["4","-"]
  Output: 0
  Explanation:
  "4" - Add 4 to the scoreboard, scoreboard is now [4].
  "-" - Remove the previous score, scoreboard is now [].
  Since the scoreboard is empty, the total sum is 0.
Data Structure
  another array to store scoreboard
Algorithm
  initialize scoreboard
  initialize totalScore as 0

  for each token
    if token matches /-?[0-9]+/ then push number converted to integer onto scoreboard
    if token matches - then pop the last value from the scoreboard
    if token matches + then add the values from length - 2 and  - 1 then push onto scoreboard
    if token matches * then double the value at length - 1 and push onto stack

  calculate the sum of all values in the scoreboard (reduce)
  return result
*/

function nexusSurge(actions) {
  let scoreboard = [];

  actions.forEach((token) => {
    if (Number.isInteger(parseInt(token, 10))) scoreboard.push(parseInt(token, 10));
    if (token === '-') scoreboard.pop();
    if (token === '+') scoreboard.push(scoreboard[scoreboard.length - 1] + scoreboard[scoreboard.length - 2]);
    if (token === '*') scoreboard.push(scoreboard[scoreboard.length - 1] * 2);
  });

  return scoreboard.reduce((total, score) => total + score);
}

console.log(nexusSurge(["3", "4", "+"]) === 14);
console.log(nexusSurge(["5", "-", "-2"]) === -2);
console.log(nexusSurge(["1", "-", "-3", "*"]) === -9);
console.log(nexusSurge(["5", "-2", "+", "-", "7", "*"]) === 24);
console.log(nexusSurge(["-3", "-", "4", "8", "+", "*"]) === 48);
console.log(nexusSurge(["1", "-2", "3", "-", "+", "-"]) === -1);
console.log(nexusSurge(["-10", "*", "-", "5", "+", "7"]) === -3);
console.log(nexusSurge(["6", "-", "-8", "*", "2", "+"]) === -36);
console.log(nexusSurge(["1", "-", "2", "*", "+", "-10", "-", "*"]) === 24);
