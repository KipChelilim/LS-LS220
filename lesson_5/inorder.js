/*
Given the root node of a binary tree, implement a
function `inorderTraversal` that returns an
array containing the values of the nodes visited in
an inorder traversal.

Your task is to implement the function iteratively using a stack.

Problem:
  implement post-order traversal using a stack
Algorithm
  general thoughts
    LNR processing
    similar to before, use given solution of starting with root in stack, but instead put all three
    step 1 pop and process
    processing is:
      pushing onto result
    stack order:
      put left on the stack
      then node on the stack
      then right on the stack

    but there's an issue if left node is null and i put all three on the stack
    on each node i want right, node, left on the stack
    if left is null i should just

    also an issue of having a never ending loop where i put a node onto stack, pop it
    then reput its left and right onto stack
    so i should only put the right node on to stack if there is no left node

stopped - checked solution
*/

function inorderTraversal(root) {
  let result = [];
  let stack = [];
  let node = root;

  while (node || stack.length > 0) {
    while (node) {
      stack.push(node);
      node = node.left
    }

    node = stack.pop();
    result.push(node.val);

    node = node.right;
  }

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
console.log(inorderTraversal(tree1)); // Output: [1, 3, 2]

const tree2 = buildTree([1, 2, 3, null, null, 4, null, null, 5]);
console.log(inorderTraversal(tree2)); // Output: [2, 1, 4, 5, 3]

const tree3 = buildTree([5, 3, null, 2, null, 1, null]);
console.log(inorderTraversal(tree3)); // Output: [1, 2, 3, 5]

const tree4 = buildTree([10, 5, 15, null, 6, 12, 21, null, null, 11]);
console.log(inorderTraversal(tree4)); // Output: [5, 6, 10, 11, 12, 15, 21]
