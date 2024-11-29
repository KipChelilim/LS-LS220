/*
Problem
  input: string `str`
  output: string with consonants reversed but vowels in same positions
  rules:
    accept a string `str`
    reverse the consonants in the string
      - aeiou -> aeiou
      - sdfghjk -> kjhgfds
      - aeiousdfghjk -> aeioukjhgfds
      - sdfajkl -> lkjafds
    preserve case when performing the swap
    return the resulting string
Algorithm
  initialize regex for consonants
  split string into characters
  initialize pointers at the start and end of the chars array
  iterate until pointers meet:
    if start is a consonant and end is a vowel
      decrement end pointer
      continue
    if end is a consonant and start is a vowel
      increment start pointer
      continue
    if start and end are consonants, swap them
      update both pointers
  join string and return it
*/

function reverseConsonants(str) {
  let vowelRegex = /[aeiou]/i
  let start = 0
  let end = str.length - 1
  let chars = str.split('');

  while (start < end) {
    if (vowelRegex.test(chars[start])) {
      start += 1;
      continue;
    } else if (vowelRegex.test(chars[end])) {
      end -= 1;
      continue;
    } else {
      [chars[start], chars[end]] = [chars[end], chars[start]];
      start += 1;
      end -= 1;
    }
  }

  return chars.join('');
}

console.log(reverseConsonants("") === "");
console.log(reverseConsonants("s") === "s");
console.log(reverseConsonants("HELLO") === "LELHO");
console.log(reverseConsonants("leetcode") === "deectole");
console.log(reverseConsonants("example") === "elapmxe");
console.log(reverseConsonants("Consonants") === "sotnonasnC");
