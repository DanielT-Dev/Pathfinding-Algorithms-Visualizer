import {inMatrix, findValue, calculateCost} from './utils.js';
import {enqueue, dequeue} from './utils.js';

export function aStar(matrix) {
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    const rows = matrix.length;
    const cols = matrix[0].length;

    let start = findValue(matrix, rows, cols, 1);
    let end = findValue(matrix, rows, cols, -2);

    if (start[0] === -1 || end[0] === -1) {
        console.log("Start or End not found!");
        return;
    }

    let cost = calculateCost(rows, cols, end);
    let gCost = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    let minHeap = [];
    let inHeap = 0;
    let visited = 0;
    let revisited = 0;

    enqueue(minHeap, [...start, 1], cost[start[0]][start[1]]); // Start counting from 2
    gCost[start[0]][start[1]] = 1;
    inHeap++;

    while (minHeap.length > 0) {
        let [current, currentPriority] = dequeue(minHeap);
        let [row, col, g] = current;
        inHeap--;

        if (row === end[0] && col === end[1]) {
            console.table(matrix);
            return;
        }

        for (let d = 0; d <= 3; d++) {
            let newRow = row + dx[d];
            let newCol = col + dy[d];

            if (inMatrix(newRow, newCol, rows, cols) && (matrix[newRow][newCol] === 0 || matrix[newRow][newCol] === -2 || g + 1 < matrix[newRow][newCol])) {
                // Telemetry
                if (matrix[newRow][newCol] != 0)
                {
                    revisited++;
                }
                visited++;
                
                let newG = g + 1;
                if (newG < gCost[newRow][newCol]) {
                    gCost[newRow][newCol] = newG;
                    let priority = newG + cost[newRow][newCol];
                    enqueue(minHeap, [newRow, newCol, newG], priority);
                    inHeap++;

                    if (matrix[newRow][newCol] !== -2) {
                        matrix[newRow][newCol] = newG;
                    }
                }
            }
        }
        
        console.log("visited: " + visited + "\nrevisited: " + revisited + "\ninHeap: " + inHeap + "\n");
    }

    console.log("No path found!");
    console.table(matrix);
}