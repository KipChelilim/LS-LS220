/*
time 852 - 931 39min

didnt need the extra space & time complexity of the array
did 2nd algorithm after skimming solution and trying it on my own
then refactored based on other's provided solutions

Problem:
  input: linked list, start index, end index
  output: linked list with reversed section
  rules:
    accept the head of a linked list
      list contains at least one node
    accept start and end values as integers
      start and end are 1 indexed positions in the list
      assume they are within the bounds of the given list
        e.g. a list of N will never have a start < 1 or and end > N
  objective: reverse the list from position start to position end inclusive
  illustrative example:
    Input: head = [1, 3, 5, 7, 9], start = 2, end = 4
    Output: [1, 7, 5, 3, 9]
    Explanation: The segment from position 2 to 4 (3 -> 5 -> 7)
                  is reversed to (7 -> 5 -> 3).


Examples
  algorithm test:
    Input: head = [1, 3, 5, 7, 9], start = 2, end = 4
    step 1:
      counter -> 1
      curr node is 1
      counter < 2 so prev = 1, new curr node is 3
    step 2:
      counter -> 2
      curr node is 3, prev is 1
      counter >= start so:
        prev is 1
        reversedSegment ==== [3]
        current node becomes 5
    step 3:
      counter -> 3
      prev is still 1
      curr node is 5
      same as above
      reversedSegment === [3, 5]
    step 4:
      counter -> 4
      curr node is 7
      same as above
      reversedSegment === [3, 5, 7]
      current node is now 9, prev still 1
    step 5: counter is > end so breaks loop

    step 1:
      pop 7 from reverseSegment -> [3, 5]
      prev is 1
      current node is 9
      1 is linked to 7
      prev moves to 7
    step 2:
      7 is linked to 5,
      prev moves to 5
    step 3:
      5 linked to 3
      prev moves to 3

    3 then linked to current which should be 9

  return the dummy


Data Structure
  array to hold nodes and pop them in reverse order
Algorithm
  initialize curr to head
  initialize dummy node
  assign prev to dummy
  assign prev.next to current

  initialize nodeIdx to 0
  initialize reversedSegment to empty array

  while nodeIdx <= end
    update nodeIdx
    if nodeIdx is less than the start value
      update prev to current
      update current to current.next
    else
      push current node to an array
      update current

  while reversedSegment is not empty
    pop value and set prev.next to node
    update prev to prev.next

  update prev.next to current

  return head
Alternate Algorithm:
  initialize dummy
  set curr to head
  set prev to dummy

  initialize nodeidx to 1

  while nodeidx is <= end
    temp = curr.next
    if node idx is === start
      conn = prev
      tail = curr
    else if node > start
      curr.next = prev
    else if nodeidx is equal to end
      tail = curr.next
      conn = curr


    prev = curr
    curr = temp
    nodeIdx += 1
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

// First Solution
// function reverseSegment(head, start, end) {
//   let curr = head;
//   let dummy = new ListNode(null, curr);
//   prev = dummy;

//   let nodeIdx = 1;
//   let reverseSegment = [];

//   while (nodeIdx <= end) {
//     if (nodeIdx < start) {
//       prev = curr;
//     } else {
//       reverseSegment.push(curr);
//     }

//     if (curr) curr = curr.next;
//     nodeIdx += 1;
//   }

//   while (reverseSegment.length > 0) {
//     prev.next = reverseSegment.pop();
//     prev = prev.next;
//   }

//   prev.next = curr;

//   return dummy.next;
// }

// Second attempt without helper array
function reverseSegment(head, start, end) {
  let dummy = new ListNode(null, head);
  let prev = dummy;
  let curr = head;
  let conn = prev;
  let tail = curr;
  let nodeIdx = 1;

  while (nodeIdx <= end) {
    let temp = curr.next;

    if (nodeIdx < start) {
      conn = curr;
      tail = curr.next;
    } else {
      curr.next = prev;
    }

    prev = curr;
    curr = temp;
    nodeIdx += 1;
  }

  tail.next = curr;
  conn.next = prev;
  return dummy.next;
}

let list1 = createLinkedList([1, 3, 5, 7, 9]);
let list2 = createLinkedList([1, 2, 3]);
let list3 = createLinkedList([1]);
let list4 = createLinkedList([1, 2, 3, 4, 5, 6]);
let list5 = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

printLinkedList(reverseSegment(list1, 2, 4)); // Expected: 1 -> 7 -> 5 -> 3 -> 9 -> null
printLinkedList(reverseSegment(list2, 1, 3)); // Expected: 3 -> 2 -> 1 -> null
printLinkedList(reverseSegment(list3, 1, 1)); // Expected: 1 -> null
printLinkedList(reverseSegment(list4, 3, 5)); // Expected: 1 -> 2 -> 5 -> 4 -> 3 -> 6 -> null
printLinkedList(reverseSegment(list5, 4, 7)); // Expected: 1 -> 2 -> 3 -> 7 -> 6 -> 5 -> 4 -> 8 -> 9 -> 10 -> null
