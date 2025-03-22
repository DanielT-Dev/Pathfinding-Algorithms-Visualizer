function inMatrix(i, j, rows, cols)
{
    return (i >=0 && j >= 0 && i < rows && j < cols);
}

// start = 1, end = -2

// [-1, -1] == start not found (error)
function findStart(matrix, rows, cols)
{
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < cols; j++)
        {
            if (matrix[i][j] == 1)
            {
                return [i, j];
            }
        }
    }

    return [-1, -1];
}

function Lee()
{
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

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

    const rows = matrix.length;
    const cols = matrix[0].length;

    let start = findStart(matrix, rows, cols);

    if (start == [-1, -1])
    {
        alert("Start not found!\n");
        return;
    }

    let queue = [];

    queue.push(start);

    while (queue.length != 0)
    {
        let [row, col] = queue.shift();

        for (let d = 0; d <= 3; d++)
        {
            let newRow = row + dx[d];
            let newCol = col + dy[d];

            if (inMatrix(newRow, newCol, rows, cols) && (matrix[newRow][newCol] == 0 || matrix[newRow][newCol] == -2 || matrix[row][col] + 1 < matrix[newRow][newCol]))
            {   
                matrix[newRow][newCol] = matrix[row][col] + 1;
                queue.push([newRow, newCol]);
            }
        }
    }

    console.log("Not found!\n");
}