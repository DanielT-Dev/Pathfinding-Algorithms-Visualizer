import {inMatrix, findValue} from './utils.js';

export function DFS(matrix)
{
    const changes = [

    ];

    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0]; 

    const rows = matrix.length;
    const cols = matrix[0].length;

    let start = findValue(matrix, rows, cols, 1);
    let end = findValue(matrix, rows, cols, -2);

    if (start[0] == -1 || end[0] == -1)
    {
        alert("Start or End not found!\n");
        return;
    }

    let st = [];
    let row;
    let col;
    let step = 0;
    let currentDistance;
    let visited = 0;
    let inStack = 0;
    let revisited = 0;

    st.push([start[0], start[1], 1, 0]);
    changes.push([start[0], start[1], 'current']);
    inStack++;

    while (st.length != 0)
    {
        [row, col, step, currentDistance] = st.pop();
        currentDistance++;

        changes.push([row, col, 'current'])
        inStack--;

        matrix[row][col] = currentDistance;

        if (row == end[0] && col == end[1])
        {
            let currentCell = end;

            while (currentCell[0] != start[0] || currentCell[1] != start[1])
            {
                if (currentCell[0] != end[0] || currentCell[1] != end[1])
                    {
                        changes.push([currentCell[0], currentCell[1], 'minimum path']);
                    }
                    else 
                    {
                        changes.push([currentCell[0], currentCell[1], 'end']);
                    }
                for (let d = 0; d <= 3; d++)
                {
                    let newCell = [currentCell[0] + dx[d], currentCell[1] + dy[d]];

                    if (inMatrix(newCell[0], newCell[1], rows, cols) && matrix[newCell[0]][newCell[1]] + 1 == matrix[currentCell[0]][currentCell[1]])
                    {
                        currentCell = newCell;
                        break;
                    }
                }
            }

            changes.push([start[0], start[1], 'start'])

            return changes;
        }

        for (let d = 0; d <= 3; d++)
        {
            let newRow = row + dx[d];
            let newCol = col + dy[d];

            if (inMatrix(newRow, newCol, rows, cols) && matrix[newRow][newCol] != -1 && (matrix[newRow][newCol] == 0 || matrix[newRow][newCol] == -2))
            {
                // Telemetry
                if (matrix[newRow][newCol] != 0)
                {
                    revisited++;
                }
                visited++;

                st.push([newRow, newCol, step + 1, currentDistance]);
                changes.push([newRow, newCol, 'in stack'])
                inStack++;
            }
        }

        changes.push([row, col, 'visited'])
    }

    return changes;
}