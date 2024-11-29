/*
Algorithm
  initialize queue with source
  while queue is not empty
    pop element
    log it
    enqueue its neighbors
*/


function bfs(adjList, source) {
  let queue = [source];

  while (queue.length > 0) {
    let vertex = queue.shift()
    console.log(vertex);
    adjList.get(vertex).forEach((neighbor) => queue.push(neighbor));
  }
}

const adjList = new Map();
adjList.set(1, []);
adjList.set(2, [1, 3, 4]);
adjList.set(3, [5]);
adjList.set(4, [6]);
adjList.set(5, []);
adjList.set(6, []);
adjList.set(7, [6]);

bfs(adjList, 2); // 2, 1, 3, 4, 5, 6  or 2, 4, 3, 1, 6, 5

// Again, the order depends on which neighbor node we explore first