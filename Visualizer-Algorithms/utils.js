export function inMatrix(i, j, rows, cols)
{
    return (i >=0 && j >= 0 && i < rows && j < cols);
}

// start = 1, end = -2

// [-1, -1] == start/end not found (error)

export function findValue(matrix, rows, cols, value)
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

export let matrix = 
[
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 1, 0, 0, 0, -1, 0, 0, -2, -1],
    [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, -1, -1, -1, -1, -1, -1, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, -1, 0, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
];