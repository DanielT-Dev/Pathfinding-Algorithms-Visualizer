function inMatrix(i, j, rows, cols)
{
    return (i >=0 && j >= 0 && i < rows && j < cols);
}

// start = 1, end = -2

// [-1, -1] == start/end not found (error)

function findValue(matrix, rows, cols, value)
{
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < cols; j++)
        {
            if (matrix[i][j] == value)
            {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

let matrix = 
    [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 1, 0, 0, 0, -1, 0, 0, -2, -1],
        [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, -1, -1, -1, -1, -1, -1, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, -1, 0, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

function DFS()
{
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0]; 

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
    inStack++;

    while (st.length != 0)
    {
        [row, col, step] = st.pop();
        inStack--;

        if (row == end[0] && col == end[1])
        {
            console.table(matrix);
            return;
        }

        matrix[row][col] = step;

        for (let d = 0; d <= 3; d++)
        {
            let newRow = row + dx[d];
            let newCol = col + dy[d];

            if (inMatrix(newRow, newCol, rows, cols) && (matrix[newRow][newCol] == 0 || matrix[newRow][newCol] == -2 || step + 1 < matrix[newRow][newCol]))
            {
                // Telemetry
                if (matrix[newRow][newCol] != 0)
                {
                    revisited++;
                }
                visited++;

                st.push([newRow, newCol, step + 1]);
                inStack++;
            }
        }

        console.log("visited: " + visited + "\nrevisited: " + revisited + "\ninStack: " + inStack + "\n");
    }
}