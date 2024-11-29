/*
Algorithm
  log current vertex (source)
  let neighbors = the array from adjlist[source]
  if empty, return
  for each,
    call function with source as key
*/

function dfs(adjList, source) {
  console.log(source);
  const neighbors = adjList.get(source);
  neighbors.forEach((vertex) => {
    dfs(adjList, vertex);
  });
}

const adjList = new Map();
adjList.set(1, []);
adjList.set(2, [1, 3, 4]);
adjList.set(3, [5]);
adjList.set(4, [6]);
adjList.set(5, []);
adjList.set(6, []);
adjList.set(7, [6]);

dfs(adjList, 2); // 2, 4, 6, 3, 5, 1 or 2, 1, 3, 5, 4, 6

// Note that the output can vary based on the order in
// which you process neighbors. These two outputs are
// the most likely, but other valid orders exist.