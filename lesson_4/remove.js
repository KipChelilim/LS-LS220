/*
time: 10:55 - 11:18 23min

quick solution but not as versatile as the solution provided
  too procedural, not very functional


Problem:
  input: linked list
  output: head of modified list
  rules:
    accept a linked list
      assume the list has at least 2 nodes
    remove the 2nd to last node in the list
    if there are only two nodes, return the remaining node as the new head
    pass through the list only once
Examples
  Example 1:
    Input: 1 -> 2 -> 3 -> 4 -> 5
    Output: 1 -> 2 -> 3 -> 5

  Example 2:
    Input: 1 -> 2
    Output: 2

  Example 3:
    Input: 3 -> 2 -> 1
    Output: 3 -> 1
Data Structure
  just the list
  pointer to two nodes prior
Algorithm
  initialize dummy
  initialize prev
  initialize curr

Thoughts
  helper function to detect second to last node
    curr.next.next === null

  if isSecondToLastNode(head) return curr.next;

  loop through the nodes until reaching second to last
    if isSecondToLastNode(current)
      p.next = curr.next

   1 -> 2 -> 3 -> 4 -> 5
             p    ^    n

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

function removeSecondToLast(head) {
  if (isSecondToLastNode(head)) return head.next;

  let dummy = new ListNode(0, head);
  let prev = dummy;
  let curr = head;

  while (curr.next) {
    if (isSecondToLastNode(curr)) {
      prev.next = curr.next;
      return dummy.next;
    }

    prev = curr;
    curr = curr.next;
  }
}

function isSecondToLastNode(node) {
  return node.next.next === null;
}

// Test cases
let list1 = createLinkedList([1, 2, 3, 4, 5]);
let list2 = createLinkedList([1, 2]);
let list3 = createLinkedList([3, 2, 1]);
let list4 = createLinkedList([1, 2, 3, 4]);
let list5 = createLinkedList([10, 20, 30, 40, 50, 60]);

// console.log("Original lists:");
// printLinkedList(list1);
// printLinkedList(list2);
// printLinkedList(list3);
// printLinkedList(list4);
// printLinkedList(list5);

// console.log("\nAfter removing second-to-last node:");
printLinkedList(removeSecondToLast(list1)); // Expected: 1 -> 2 -> 3 -> 5 -> null
printLinkedList(removeSecondToLast(list2)); // Expected: 2 -> null
printLinkedList(removeSecondToLast(list3)); // Expected: 3 -> 1 -> null
printLinkedList(removeSecondToLast(list4)); // Expected: 1 -> 2 -> 4 -> null
printLinkedList(removeSecondToLast(list5)); // Expected: 10 -> 20 -> 30 -> 40 -> 60 -> null