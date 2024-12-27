/*
// Given the root node of a binary tree, implement a
// function `preorderTraversal`, that returns an
// array containing the values of the nodes visited in
// a preorder traversal.

// Your task is to implement the function iteratively using a stack.

Problem:
  input: root node of binary tree
  output: array of elements found with preorder traversal search
  rules:
    accept the root node of a binary tree
      null values in tree indicate the end of the node
    use preorder traversal and a stack to process nodes
    output an array reflecting the nodes in preordered traversal
Examples:

Data Structures
Algorithm
  thoughts:
    need to process current node and left node
    once processed, put right node onto stack
    then move left node to current
    one left node produces null, set curret node to right node on the stack

    processing involves pushing into resulting array

    change to the order:
      step to the node
      check if the node is null -> if so start unwinding stack
      if node is not null, get its value,
      add to stack
      step to next left
  main program:
    initialize stack
    initialize result array
    initialize curr = root

    while curr node is not null or i have a right node in the stack
      if node is null:
        curr = stack.pop()
      else:
        result.push(curr.val)
        stack.push(curr.right)
        curr = curr.left

    return result
*/

function preorderTraversal(root) {
  let result = [];
  let stack = [];
  let curr = root;

  do {
    if (curr) {
      result.push(curr.val);
      stack.push(curr.right);
      curr = curr.left
    } else {
      curr = stack.pop();
    }
  } while (curr || stack.length > 0);

  return result;
}

class Node {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

// Helper function for test cases
function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  }

  const nodes = [];

  const val = arr.shift();
  const root = new Node(val);
  nodes.push(root);

  while (arr.length > 0) {
    const curr = nodes.shift();

    const leftVal = arr.shift();
    if (leftVal !== null) {
      curr.left = new Node(leftVal);
      nodes.push(curr.left);
    }

    if (arr.length > 0) {
      const rightVal = arr.shift();
      if (rightVal !== null) {
        curr.right = new Node(rightVal);
        nodes.push(curr.right);
      }
    }
  }

  return root;
}

// Test Cases:

const tree1 = buildTree([1, null, 2, 3]);
console.log(preorderTraversal(tree1)); // Output: [1, 2, 3]

const tree2 = buildTree([1, 2, 3, null, null, 4, null, null, 5]);
console.log(preorderTraversal(tree2)); // Output: [1, 2, 3, 4, 5]

const tree3 = buildTree([5, 3, null, 2, null, 1, null]);
console.log(preorderTraversal(tree3)); // Output: [5, 3, 2, 1]

const tree4 = buildTree([10, 5, 15, null, 6, 12, 21, null, null, 11]);
console.log(preorderTraversal(tree4)); // Output: [10, 5, 6, 15, 12, 11, 21]