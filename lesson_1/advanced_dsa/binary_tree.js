/*
rules
  height of the root node is 1, so use 1 based index to count height
  height of the entire tree is based on the lowest node

Algorithm
  thoughts
    the lowest node is the node that is a leaf at the lowest level
    could set a variable to hold a max value and pass that to each function call
    have a helper traverse the tree in two recursive calls left and right with a counter
      while node is not null, move to next
      while node is not null, move to right

      in both, set counter to the max value of current tree and last found tree
  main program
    initialize maxHeight to 0;
    initialize currHeight
    call findMaxHeight(node, currHeight);
    return maxHeight
  helper - findMaxHeight
    while node is not null
      currentHeight + 1
      maxHeight = max between max height and current height
      helper(node.left, counter)
      helper(node.left, counter)
*/

function getHeight(root) {
  let maxHeight = 0;
  let currHeight = 0;

  function findMaxHeight(node, currHeight) {
    if (node) {
      currHeight += 1;
      maxHeight = Math.max(currHeight, maxHeight);
      findMaxHeight(node.left, currHeight)
      findMaxHeight(node.right, currHeight)
    }
  }

  findMaxHeight(root, currHeight);

  return maxHeight;
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

// Test Cases

const tree1 = buildTree([1]);
console.log(getHeight(tree1) === 1);

const tree2 = buildTree([1, 2, 3, null, null, 4, 5]);
console.log(getHeight(tree2) === 3);

const tree3 = buildTree([1, 2, 3, 4, 5, 6, 7]);
console.log(getHeight(tree3) === 3);

const tree4 = buildTree([1, 2, 3, null, null, 4, 5, null, null, null, 6]);
console.log(getHeight(tree4) === 4);

const tree5 = buildTree([1, 2, null, 3, null, 4, null, 5, 6, null, null, null, 7]);
console.log(getHeight(tree5) === 6);

const tree6 = buildTree([1, 2, null, 3, null, 4, null, 5, null, 6, 8, null, 7, null, 9, null, null, null, 10]);
console.log(getHeight(tree6) === 8);
// All test cases should log true