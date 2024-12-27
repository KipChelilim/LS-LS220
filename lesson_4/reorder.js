/*
Problem
  input: linked list
  output: modified list
  rules:
    accept a linked list
      list can be empty
      first node on the list is considered odd position
    objective: reorder the list so all odd nodes occur before even nodes
    maintain order of odd and even nodes
      e.g. [1, 2, 3, 4, 5] -> [1, 3, 5, 2, 4]
           [3, 2, 4, 5, 1] -> [3, 4, 1, 2, 5]
    if a list has only one node or is empty, return the original list
Example:
  Input: head = [1, 2, 3, 4, 5]
  Output: [1, 3, 5, 2, 4]
  Explanation: Nodes at odd positions (1, 3, 5) are grouped
                first, followed by nodes at even positions (2, 4).
Data Structure
  just the two lists
Scraped Algorithm
  if list is empty or only has one node, return list;

  initialize first odd node: prev to head
  initialize first even node: curr to head.next
  initialize dummy to reference collected even values: evenDummy
  initialize prevEven to update with even values: prevEven = evenDummy

  while the next even node is not null (curr.next.next)
    set the prior node which is odd to the next node which is also odd: (prev.next = curr.next)
    set the next even node to the current node which is even (prevEven.next = curr)

    set my prev node to the next odd node (prev = curr.next)
    set my current node to the next even node (curr = curr.next.next)
    set my prevEven node to the one i just assigned: (prevEven = PrevEven.next)

  assign the last odd node to the start of the even list (prev.next = evenDummy.next)
  return original list (return head)

Algorithm
  if list is empty or only has one node, return list;

  initialize first odd node: curr to head
  initialize dummy to reference collected even values: evenDummy
  initialize lastEvenNode to update with even values: prevEven = evenDummy

  while there's another node to move to (curr.next)

    set lastEvenNode equal to next even node: lastEvenNode.next = curr.next
    if there's an even number of nodes: curr.next
      set current node equal to next odd node: curr.next = curr.next.next

    slide to next EvenNode: lastEvenNode = lastEvenNode.next
    slide to next odd node: curr = curr.next.next

  set curr node equal to dummyeven .next
  return head
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

function reorderOddEven(head) {
  if (head === null || head.next === null) return head;

  let curr = head;
  let evenDummy = new ListNode(0, head.next);
  let lastEvenNode = evenDummy.next;

  while (curr.next && curr.next.next) {
    curr.next = curr.next.next;
    lastEvenNode.next = curr.next.next;

    curr = curr.next;
    lastEvenNode = lastEvenNode.next
  }

  curr.next = evenDummy.next;
  return head;
}

// Test cases
let list1 = createLinkedList([1, 2, 3, 4, 5]);
let list2 = createLinkedList([2, 1, 3, 5, 6, 4, 7]);
let list3 = createLinkedList([1, 2, 3, 4]);
let list4 = createLinkedList([1]);
let list5 = createLinkedList([1, 2]);
let list6 = createLinkedList([]);

// console.log("Original lists:");
// printLinkedList(list1);
// printLinkedList(list2);
// printLinkedList(list3);
// printLinkedList(list4);
// printLinkedList(list5);
// printLinkedList(list6);

// console.log("\nAfter reordering odd and even positions:");
printLinkedList(reorderOddEven(list1)); // Expected: 1 -> 3 -> 5 -> 2 -> 4 -> null
printLinkedList(reorderOddEven(list2)); // Expected: 2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4 -> null
printLinkedList(reorderOddEven(list3)); // Expected: 1 -> 3 -> 2 -> 4 -> null
printLinkedList(reorderOddEven(list4)); // Expected: 1 -> null
printLinkedList(reorderOddEven(list5)); // Expected: 1 -> 2 -> null
printLinkedList(reorderOddEven(list6)); // Expected: null
