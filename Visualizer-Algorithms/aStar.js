function inMatrix(i, j, rows, cols)
{
    return (i >= 0 && j >= 0 && i < rows && j < cols);
}

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

function aStar()
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

    let start = findValue(matrix, rows, cols, 1);
    let end = findValue(matrix, rows, cols, -2);

    if (start[0] == -1 || end[0] == -1)
    {
        console.log("Start or End not found!");
        return;
    }

    let priorityQueue = [];

    function heuristic(i, j, end)
    {
        return Math.abs(i - end[0]) + Math.abs(j - end[1]);
    }

    function enqueue(value, priority)
    {
        priorityQueue.push({ value, priority });
        priorityQueue.sort((a, b) => a.priority - b.priority);
    }

    function dequeue()
    {
        return priorityQueue.shift();
    }

    let distance = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    distance[start[0]][start[1]] = 0;

    enqueue(start, heuristic(start[0], start[1], end));

    while (priorityQueue.length > 0)
    {
        let { value } = dequeue();
        let [row, col] = value;

        if (row === end[0] && col === end[1])
        {
            console.log("Path found! Distance:", distance[row][col]);
            return;
        }

        for (let d = 0; d < 4; d++)
        {
            let newRow = row + dx[d];
            let newCol = col + dy[d];

            if (inMatrix(newRow, newCol, rows, cols) && (matrix[newRow][newCol] == 0 || matrix[newRow][newCol] == -2))
            {   
                let newDist = distance[row][col] + 1;
                
                if (newDist < distance[newRow][newCol])
                {
                    distance[newRow][newCol] = newDist;

                    if (matrix[newRow][newCol] != -2)
                    {
                        matrix[newRow][newCol] = matrix[row][col] + 1;
                    }
                    
                    let priority = newDist + heuristic(newRow, newCol, end);
                    enqueue([newRow, newCol], priority);
                }
            }
        }
    }
    console.log("No path found!");
}
