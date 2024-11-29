const grid = [
  ["", "C", ""],
  ["", "", ""],
];

// There is only one distinct path Chaos can take:
// 1. Down -> Right -> Right

function chaosInTheGridWithCats(grid) {
  let cache = new Map();

  function pathsToCoordinate(row = 0, col = 0) {
    const maxRow = grid.length - 1;
    const maxCol = grid[0].length - 1;
    const coordinate = `${row}${col}`;

    if (cache.has(coordinate)) return cache.get(coordinate);

    if (row > maxRow || col > maxCol || grid[row][col] === 'C') {
      return 0;
    } else if (row === maxRow && col === maxCol) {
      cache.set(coordinate, 1);
    } else {
      let result = pathsToCoordinate(row + 1, col) + pathsToCoordinate(row, col + 1);
      cache.set(coordinate, result);
    }

    return cache.get(coordinate);
  }

  return pathsToCoordinate();
}

// Test Cases:

const grid1 = [
  ["", "C"],
  ["", ""],
];
const grid2 = [["", "C"]];
const grid3 = [
  ["", "", ""],
  ["", "C", ""],
  ["", "", ""],
];
const grid4 = [
  ["", "", "", "", "C"],
  ["", "C", "", "", ""],
  ["", "", "", "C", ""],
];
const grid5 = [
  ["", "", "", "", "C", ""],
  ["", "C", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "C", "", ""],
  ["", "C", "", "", "", ""],
  ["", "", "", "", "", ""],
];

console.log(chaosInTheGridWithCats(grid1) === 1);
console.log(chaosInTheGridWithCats(grid2) === 0);
console.log(chaosInTheGridWithCats(grid3) === 2);
console.log(chaosInTheGridWithCats(grid4) === 2);
console.log(chaosInTheGridWithCats(grid5) === 43);