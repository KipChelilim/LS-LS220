/*

replace every instance of a (\d * \d){1}( * \d)+
*/

function calculator(expression) {
  return `${expression.match(/(\d+)(( *)(\*|\/)( *)(\d+))+/g)}`;
}

// console.log(calculator("6 - 2") === 4);
// console.log(calculator(" 8 / 3") === 2);
// console.log(calculator("2+3*4") === 14);
// console.log(calculator("10 - 2 * 3 + 4 ") === 8);
// console.log(calculator(" 20 / 4 * 2 + 7") === 17);
// console.log(calculator("5 + 3 * 2 - 8 / 4") === 9);
// console.log(calculator("10+5/4-3*2+2") === 7);
// console.log(calculator(" 30 / 3 * 2 - 4 * 2 / 4 + 1 ") === 19);
// console.log(calculator("100 - 20 * 3 / 2 + 5 * 4 - 10 / 2 * 3") === 75);

// console.log(calculator("6 - 2"));
// console.log(calculator(" 8 / 3"));
// console.log(calculator("2+3*4"));
// console.log(calculator("10 - 2 * 3 + 4 "));
// console.log(calculator(" 20 / 4 * 2 + 7"));
// console.log(calculator("5 + 3 * 2 - 8 / 4"));
// console.log(calculator("10+5/4-3*2+2"));
// console.log(calculator(" 30 / 3 * 2 - 4 * 2 / 4 + 1 "));
console.log(calculator("100 - 20 * 3 / 2 + 5 * 4 - 10 / 2 * 3"));
