import {inMatrix, findValue} from './utils.js';
import Queue from '../App/src/structures/Queue.js';

export function Lee(matrix)
{
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    let changes = [
        
    ]

    const rows = matrix.length;
    const cols = matrix[0].length;

    let start = findValue(matrix, rows, cols, 1);
    let end = findValue(matrix, rows, cols, -2);

    if (start[0] == -1 || end[0] == -1)
    {
        alert("Start/End not found!\n");
        return;
    }

    let queue = new Queue()
    
    let visited = 0;
    let revisited = 0;
    let inQueue = 0;

    queue.enqueue(start);
    changes.push([start[0], start[1], 'in stack'])

    inQueue++;

    while (queue.length != 0)
    {
        let [row, col] = queue.dequeue();
        changes.push([row, col, 'current'])
        inQueue--;
        
        if (row == end[0] && col == end[1])
        {
            console.table(matrix);
            return changes;
        }

        for (let d = 0; d <= 3; d++)
        {
            let newRow = row + dx[d];
            let newCol = col + dy[d];

            if (inMatrix(newRow, newCol, rows, cols) && (matrix[newRow][newCol] == 0 || matrix[newRow][newCol] == -2 || matrix[row][col] + 1 < matrix[newRow][newCol]))
            {   
                // Telemetry
                if (matrix[newRow][newCol] != 0)
                {
                    revisited++;
                }
                visited++;
                
                matrix[newRow][newCol] = matrix[row][col] + 1;
                queue.enqueue([newRow, newCol]);
                changes.push([newRow, newCol, 'in stack'])
                inQueue++;
            }
        }

        changes.push([row, col, 'visited'])
    }

    console.log("Not found!\n");
    return changes;
}