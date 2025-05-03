import { cellRefs } from "./components/Grid";
import { clearMatrix } from "./utils";

const directionSize = 4;

const wall = -1;
const unvisited = 0;
const visited = 1;
const processing = 2;

// row & 1 != col & 1 => wall
// otherwise, unvisited

function printMaze(maze) {
    console.log(maze.map(row => row.map(cell =>
        cell === -1 ? "#" :
            cell === 0 ? "." :
                cell === 1 ? "-" : "*" // wall, unvisited, visited, processing
    ).join("")).join("\n"));
}

function inMatrix(i, j, rows, cols) {
    return (0 <= i && i < rows && 0 <= j && j < cols);
}

function generateMaze(rows, cols) {
    let maze = [];
    let possibleStart = [];
    let totalCells = 0;
    let visitedCells = 0;

    // Possible direction (up, down, left, right for now) - TODO: diagonals (maybe?)
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    // Mark all as unvisited
    for (let i = 0; i < rows; i++) {
        maze[i] = [];
        for (let j = 0; j < cols; j++) {
            if ((i & 1) != (j & 1)) {
                maze[i][j] = wall;
            }
            else {
                totalCells++;
                possibleStart.push([i, j]);
                maze[i][j] = unvisited;
            }
        }
    }

    let stack = [];

    while (visitedCells != totalCells) {
        let startRow = 0;
        let startCol = 0;

        let endRow = 0;
        let endCol = 0;

        // random generated start
        let startPosition = Math.floor(Math.random() * (possibleStart.length));

        startRow = possibleStart[startPosition][0];
        startCol = possibleStart[startPosition][1];

        possibleStart[startPosition] = possibleStart[possibleStart.length - 1];
        possibleStart.pop();

        if (possibleStart.length <= 1) {
            maze[startRow][startCol] = visited;
            break;
        }

        // random generated end
        let endPosition = Math.floor(Math.random() * (possibleStart.length));

        endRow = possibleStart[endPosition][0];
        endCol = possibleStart[endPosition][1];

        possibleStart[endPosition] = possibleStart[possibleStart.length - 1];
        possibleStart.pop();

        let currentRow = startRow;
        let currentCol = startCol;

        // Mark start and end
        maze[startRow][startCol] = processing;

        stack.push([startRow, startCol]);

        maze[endRow][endCol] = visited; // end == start => algorithm tries to reach the start

        let bigOK = 1;
        let lastDirection = -100;

        let loopNumber = 0;

        // Form a path from current start to current end (or until current walk intersects a previous walk)
        while (bigOK == 1) {
            let newRow = currentRow;
            let newCol = currentCol;
            let wallRow = currentRow;
            let wallCol = currentCol;

            let currentDirection = 0;

            let correctDirection = 1;

            // Pick a random direction to go (repeat until it is inside the matrix)
            do {

                correctDirection = 0;
                // Pick a random direction to go in              
                currentDirection = Math.floor(Math.random() * directionSize);

                // New position
                wallRow = currentRow + dx[currentDirection];
                wallCol = currentCol + dy[currentDirection];
                newRow = currentRow + 2 * dx[currentDirection];
                newCol = currentCol + 2 * dy[currentDirection];

                if (inMatrix(newRow, newCol, rows, cols)) {
                    if ((currentDirection == 0 && lastDirection == 1) || (currentDirection == 1 && lastDirection == 0) || (currentDirection == 2 && lastDirection == 3) || (currentDirection == 3 && lastDirection == 2)) {
                        correctDirection = 0;
                    }
                    else {
                        correctDirection = 1;
                    }
                }

                // New cell
            } while (correctDirection == 0);

            lastDirection = currentDirection;
            currentRow = newRow;
            currentCol = newCol;

            switch (maze[currentRow][currentCol]) {
                // End current Walk
                case visited:

                    maze[wallRow][wallCol] = visited;

                    while (stack.length != 0) {
                        let top = stack.length - 1;
                        let stackRow = stack[top][0];
                        let stackCol = stack[top][1];

                        if ((stackRow & 1) == (stackCol & 1)) {
                            visitedCells++;
                        }

                        maze[stackRow][stackCol] = visited;

                        stack.pop();
                    }

                    bigOK = 0;

                    break;
                // Mark as in processing for current walk
                case unvisited:
                    stack.push([wallRow, wallCol]);
                    stack.push([currentRow, currentCol]);

                    maze[wallRow][wallCol] = processing;
                    maze[currentRow][currentCol] = processing;

                    break;
                // Erase loop
                case processing:
                    loopNumber++;
                    if (loopNumber >= 20) {
                        maze[wallRow][wallCol] = visited;

                        while (stack.length != 0) {
                            let top = stack.length - 1;
                            let stackRow = stack[top][0];
                            let stackCol = stack[top][1];

                            if ((stackRow & 1) == (stackCol & 1)) {
                                visitedCells++;
                            }

                            maze[stackRow][stackCol] = visited;

                            stack.pop();
                        }

                        bigOK = 0;
                    }

                    let top = stack.length - 1;
                    let stackRow = currentRow;
                    let stackCol = currentCol;
                    let ok = 1;

                    while (stack.length != 0 && ok == 1) {
                        top = stack.length - 1;
                        stackRow = stack[top][0];
                        stackCol = stack[top][1];

                        if (stackRow == currentRow && stackCol == currentCol) {
                            ok = 0;
                            break;
                        }

                        stackRow = stack[top][0];
                        stackCol = stack[top][1];

                        if ((stackRow & 1) != (stackCol & 1)) {
                            maze[stackRow][stackCol] = wall;
                        }
                        else {
                            maze[stackRow][stackCol] = unvisited;
                        }

                        stack.pop();
                    }

                    break;

            }
        }
    }

    let finalStart = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (maze[i][j] == 1) {
                finalStart.push([i, j]);
                maze[i][j] = 0
            }
        }
    }


    // start == -2
    // end == -3

    let startPos = Math.floor(Math.random() * finalStart.length);

    maze[finalStart[startPos][0]][finalStart[startPos][1]] = -2;
    finalStart[startPos] = finalStart[finalStart.length - 1];

    finalStart.pop();

    let endPos = Math.floor(Math.random() * finalStart.length);

    maze[finalStart[endPos][0]][finalStart[endPos][1]] = -3;
    finalStart[endPos] = finalStart[finalStart.length - 1];

    finalStart.pop();

    // printMaze(maze);

    return maze;
}

export const handleRandomButton = (rows, cols) => {
    clearMatrix(cellRefs);
    return generateMaze(rows, cols);
}