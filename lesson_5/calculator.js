/*
Problem
  input: string containing numbers an arithmetic operator characters
  output: result of expression as number type
  rules:
    accept a string containing: numbers, arithmetic operator ('+' '-' '*' and '/') and whitespace
      assume numbers are nonnegative integers
      assume only valid arithmetic operators will be provided
      assume the string will not be empty
    implement a caluclator that can process the expression in the string
    follow order of operations
    assume the string will not try to divide by 0
    when dividing, perform floor division
  objective: implement a calculator that evaluates the string expression
Examples
  1. Input: "4 + 3 * 2"
      Output: 10
      Explanation: 3*2 is evaluated first (6), then added to 4.

  2. Input: "15 / 3 - 2"
      Output: 3
      Explanation: 15/3 is 5, then 2 is subtracted.

  3. Input: "10 + 8 / 3"
      Output: 12
      Explanation: 8/3 is 2 (rounded down), then added to 11.
Data Structure
  stack and register to hold held operations
  two registers - one to store the held operation, the other to store multiplication result
  stack is worked like a queue from the expression
Algorithm Ideas:
  "4 + 3 * 2 * 1 + 1" === 11
    split expression by white space to create stack
    when you get a number, put number on stack
      [4]
      expression: "+ 3 * 2 * 1 + 1"
    when you get a plus or minus, put operation into register as delayedOperation
      [4]
      register: +
      expression: "3 * 2 * 1 + 1"
    when you get next number put it on stack
      [4, 3]
      register: +
      expression: "* 2 * 1 + 1"
    when * or division, pop value from stack and expression perform operation, put on stack
      operation: 3 * 2 == 6
      stack: [4, 6]
      register: +
      expression: "* 1 + 1"
    multiplication again
      operation: 6 * 1 === 6
      stack: [4, 6]
      register: +
      expression: "+ 1"
    when you find another non multiplication
      finish held operation:
        pop last value, multiple by 1 or -1, put on stack
      then update next held operation:
        update heldOperation

  generally,
  Scrap:
      shift three values from expression
      if middle third is addition, put first number on stack, second number
Final Algorithm:
  initialize stack to string.split(' ');
  initialize register
  intiaialize running total

  while stack.length is not empty
    if value is a number put it in register
    if value is addition
      runningTotal += heldValue * sign
      heldValue = register
      sign = 1
    if value is subtraction
      runningTotal - register
    if value is multiplication
      register *= stack.pop
    if value is division
      register =  Math.floor(register / stack.pop)

  return runningTotal +=  register

*/

function calculator(expression) {
  let stack = expression.trim().split(/ +|\b/g);
  let register = 0;
  let sign = 1;
  let runningTotal = 0;

  while (stack.length > 0) {
    let token = stack.shift();
    switch (token) {
      case '+':
        runningTotal += register * sign;
        sign = 1;
        break;
      case '-':
        runningTotal += register * sign;
        sign = -1;
        break;
      case '*':
        register *= parseInt(stack.shift(), 10);
        break;
      case '/':
        register = Math.floor(register / parseInt(stack.shift(), 10));
        break;
      default:
        register = parseInt(token, 10);
    }
  }

  return runningTotal += register * sign;
}

console.log(calculator("6 - 2") === 4);
console.log(calculator(" 8 / 3") === 2);
console.log(calculator("2+3*4") === 14);
console.log(calculator("10 - 2 * 3 + 4 ") === 8);
console.log(calculator(" 20 / 4 * 2 + 7") === 17);
console.log(calculator("5 + 3 * 2 - 8 / 4") === 9);
console.log(calculator("10+5/4-3*2+2") === 7);
console.log(calculator(" 30 / 3 * 2 - 4 * 2 / 4 + 1 ") === 19);
console.log(calculator("100 - 20 * 3 / 2 + 5 * 4 - 10 / 2 * 3") === 75);
// All test cases should log true.