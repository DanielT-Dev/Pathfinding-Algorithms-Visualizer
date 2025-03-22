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

function inMatrix(i, j)
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

let start = findStart(matrix, rows, cols);

function DFS(start)
{

    if (start == [-1, -1])
    {
        alert("Start not found!\n");
        return;
    }

    let st = [];
    let top = [];
    let row;
    let col;
    let step;

    st.push([start[0], start[1], 1]);

    while (st.length != 0)
    {
        [row, col, step] = st.pop();

        if (matrix[row][col] == -2)
        {
            console.log("Found it at: " + row + " " + col);
            return;
        }

        matrix[row][col] = step;

        for (let d = 0; d <= 3; d++)
        {
            let newRow = row + dx[d];
            let newCol = col + dy[d];

            if (inMatrix(newRow, newCol) && (matrix[newRow][newCol] == 0 || matrix[newRow][newCol] == -2 || step < matrix[newRow][newCol]))
            {
                st.push([newRow, newCol, step + 1]);
            }
        }
    }
}