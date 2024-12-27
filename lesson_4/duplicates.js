/*
time 735 - 807

largely got it
some opportunity to refactor and make it code more clear
idea for refactoring is to just slide the pointer until finding a unique node
  rather than checking each node and trying to add to the set N times
would reduce space and time complexity by getting rid of the set
would require reordering the conditional to check for unique values first and move pointers,
  then let the else manage removing duplicates

above is a mirror of the solution code

Problem
  input: head of a linked list
  output: head of the new modified list or null if empty
  rules:
    accept a sorted linked list
      assume values are number types
      assume list will not start emtpy
      every list will not have a duplicate
    objective: remove all duplicate values from a linked list
    by duplicate values, its referring to any value that appears more than once
      e.g. [1, 1, 1, 1] should result in all values being removed
    if the linked list ends up empty return null
    each list returns the first node, not a null head

  illustrative examples
    Input: head = [1, 2, 2, 3, 3, 4, 5, 5]
    Output: [1, 4]
    Explanation: The values 2, 3, and 5 appear multiple times, so
                  they are removed. Only 1 and 4 remain as unique
                  values.
Examples
Data Structure
Algorithm
  initialize prev as dummy node
  set prev.next value to head
  initialize current to prev

  while current node is not null
    if current nodes value === next nodes value add current value to set

    if set has value
      prev.next = current.next
    else
      prev = current

    current = current.next

Thoughts:
  will need to traverse the entire list once to identify any values that have a duplicate
  can add value to a set and do the search & delete as i move through the list
  will need to do the loop twice since i can't navigate to a previous note, this is one direction

*/

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function printLinkedList(head) {
  let currentNode = head;
  let listStr = '';
  while (currentNode !== null) {
    listStr += currentNode.val + ' -> ';
    currentNode = currentNode.next;
  }
  listStr += 'null';
  console.log(listStr);
}

function createLinkedList(arr) {
  let head = new ListNode(0);
  let current = head;
  arr.forEach(val => {
    current.next = new ListNode(val);
    current = current.next;
  });
  return head.next;
}

function removeDuplicates(head) {
  let duplicates = new Set();

  let dummy = new ListNode(null);
  let current = head;
  let prev = dummy;
  prev.next = current;

  while (current) {
    if (current.next !== null && current.val === current.next.val) duplicates.add(current.val);

    if (duplicates.has(current.val)) {
      prev.next = current.next;
    } else {
      prev = current;
    }

    current = current.next
  }

  return dummy.next;
}

let list1 = createLinkedList([1, 2, 2, 3, 3, 4, 5, 5]);
let list2 = createLinkedList([1, 1, 1, 2, 3]);
let list3 = createLinkedList([1, 2, 3, 4, 5]);
let list4 = createLinkedList([1, 1, 1, 1, 1]);
let list5 = createLinkedList([1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5]);

printLinkedList(removeDuplicates(list1)); // Expected: 1 -> 4 -> null
printLinkedList(removeDuplicates(list2)); // Expected: 2 -> 3 -> null
printLinkedList(removeDuplicates(list3)); // Expected: 1 -> 2 -> 3 -> 4 -> 5 -> null
printLinkedList(removeDuplicates(list4)); // Expected: null
printLinkedList(removeDuplicates(list5)); // Expected: 1 -> null