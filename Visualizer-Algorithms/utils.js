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

// Precompute Manhattan heuristic cost
export function calculateCost(rows, cols, end) {
    let cost = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            cost[row][col] = Math.abs(end[0] - row) + Math.abs(end[1] - col);
        }
    }

    return cost;
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