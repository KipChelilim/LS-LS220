/*
Algorithm
  initialize stack
  while stack is not empty
    pop value
    if visited return
    log it
    push all neighbors onto stack if they haven't been visited
*/

// Implement a function `dfs` that accepts two arguments: an adjacency
// list representing an undirected graph, and a starting vertex (source).
// The function should print the vertices in preorder depth-first
// traversal order.

function dfs(adjList, source, visited = new Set()) {
  let stack = [source];
  visited.add(source);

  while (stack.length > 0) {
    let curr = stack.pop();
    console.log(curr);

    adjList.get(curr).forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);
      }
    });
  }
}

const adjList = new Map();
adjList.set(1, [2]);
adjList.set(2, [1, 3]);
adjList.set(3, [2]);

dfs(adjList, 1); // 1, 2, 3

const adjList2 = new Map();
adjList2.set(1, [2, 3]);
adjList2.set(2, [1, 4]);
adjList2.set(3, [1, 4, 5]);
adjList2.set(4, [2, 3]);
adjList2.set(5, [3, 6]);
adjList2.set(6, [5]);

dfs(adjList2, 1);