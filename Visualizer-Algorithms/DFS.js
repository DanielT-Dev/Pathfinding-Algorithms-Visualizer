import {inMatrix, findValue} from './utils.js';

export function DFS(matrix)
{
    const changes = [

    ]

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
    let step;

    let inStack = 0;
    let visited = 0;
    let revisited = 0;

    st.push([start[0], start[1], 1]);
    changes.push([start[0], start[1], 'in stack'])
    inStack++;

    while (st.length != 0)
    {
        [row, col, step] = st.pop();
        changes.push([row, col, 'current'])
        inStack--;

        if (row == end[0] && col == end[1])
        {
            return changes;
        }

        matrix[row][col] = step;

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

                st.push([newRow, newCol, step + 1]);
                changes.push([newRow, newCol, 'in stack'])
                inStack++;
            }
        }

        changes.push([row, col, 'visited'])

        //console.log("visited: " + visited + "\nrevisited: " + revisited + "\ninStack: " + inStack + "\n");
    }

    return changes;
}