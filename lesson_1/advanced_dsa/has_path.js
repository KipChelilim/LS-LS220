/*
// Given an undirected graph represented by an edge list, determine if
// there is a path between specified source and destination vertices.

// Implement the function `hasPath` that takes three arguments:
// an edge list representing the graph, a source vertex, and a
// destination vertex. The function should return true if a path
// exists between the source and destination, and false otherwise.

time 202 311 66min
  pause 3min

takeaways - got tripped up on recursive search, had to scrap 45 min in for a stack

Problem
  input: edge list
  output: boolean
  rules:
    accept an edge list representing an undirected graph
    accept a source vertex `src`
    accept a destination vertex `dst`
    identify if there is a path between the src an dst

Examples:
  cyclical
    has a path -> given
    does not -> given
  acyclical
    has a path -> given
    does not -> given
  empty graph -> given
  malformed inputs:
    duplicate edges -> given
Data Structure
  convert to an adjacent list
Algorithm
  thoughts
    during conversion, are there checks I can do to short circuit?
    recursive logic:
      if i find dst, return true
      if i can't find a vertex i haven't visited and still haven't found dst return false
      otherwise keep searching the next neighbor
  main program
    initialize adjList to return value of addToAdjList(edgeList)
    initialize stack as src
    initialize visited set with src

    while stack is not empty
      pop value from stack
      if its been visited, continue;
      if its equal destination return true
      add it to visited

      for each neighbor
        if its been visited, continue
        push it to the stack
  helper
    addToAdjList(edgeList)
      initialize map object
      for each element in edgeList
        if the edge[0] does not exist add it and set it equal to a set
        push edge[1]

        if edge[1] does not exist, add it
        push edge[0]

      return map object
*/

function hasPath(edgeList, src, dst) {
  const adjList = addToAdjList(edgeList);
  let stack = [src];
  let visited = new Set([src]);

  while (stack.length > 0) {
    let curr = stack.pop();
    if (curr === dst) return true;

    adjList.get(curr).forEach((vertex) => {
      if (!visited.has(vertex)) {
        visited.add(vertex);
        stack.push(vertex);
      }
    });
  }
  return false;
}

function addToAdjList(edgeList) {
  let adjList = new Map();
  edgeList.forEach(([vertex1, vertex2]) => {
    if (!adjList.has(vertex1)) adjList.set(vertex1, new Set());
    adjList.get(vertex1).add(vertex2);

    if (!adjList.has(vertex2)) adjList.set(vertex2, new Set());
    adjList.get(vertex1).add(vertex2);
  });

  return adjList
}

console.log(hasPath([[1, 2], [2, 3], [3, 4]], 1, 4) === true);
console.log(hasPath([[1, 2], [3, 4]], 1, 4) === false);
console.log(hasPath([[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [5, 6]], 1, 6) === true);
console.log(hasPath([], 1, 1) === true);
console.log(hasPath([[1, 2], [1, 3], [4, 5], [6, 7]], 2, 5) === false);
console.log(hasPath([[1, 2], [2, 3], [3, 4], [4, 5], [1, 5], [2, 6], [6, 7], [7, 8], [8, 5]], 1, 8) === true);
console.log(hasPath([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3], [2, 7], [7, 8], [8, 7], [7, 9], [9, 10], [10, 11], [11, 12], [12, 10], [7, 13]], 1, 13) === true);
console.log(hasPath([[1, 2], [2, 3], [3, 1], [4, 5], [5, 6], [6, 4], [7, 8], [8, 9], [9, 10], [10, 7], [11, 12], [13, 14], [14, 15], [15, 13]], 1, 12) === false);
// // All test cases should log true