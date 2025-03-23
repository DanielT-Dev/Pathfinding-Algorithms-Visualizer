function inMatrix(i, j, rows, cols) {
    return i >= 0 && j >= 0 && i < rows && j < cols;
}

function findValue(matrix, rows, cols, value) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === value) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

// Binary Heap Functions (Priority Queue)
function heapifyUp(heap, index) {
    while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (heap[parentIndex][1] <= heap[index][1]) break;
        [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
        index = parentIndex;
    }
}

function heapifyDown(heap, index) {
    while (true) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;

        if (left < heap.length && heap[left][1] < heap[smallest][1]) smallest = left;
        if (right < heap.length && heap[right][1] < heap[smallest][1]) smallest = right;

        if (smallest === index) break;

        [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
        index = smallest;
    }
}

function enqueue(heap, value, priority) {
    heap.push([value, priority]);
    heapifyUp(heap, heap.length - 1);
}

function dequeue(heap) {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();
    let min = heap[0];
    heap[0] = heap.pop();
    heapifyDown(heap, 0);
    return min;
}

// Precompute Manhattan heuristic cost
function calculateCost(rows, cols, end) {
    let cost = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            cost[row][col] = Math.abs(end[0] - row) + Math.abs(end[1] - col);
        }
    }

    return cost;
}

function aStar() {
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    let matrix = [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1,  1,  0,  0,  0, -1,  0,  0, -2, -1],
        [-1, -1, -1,  0, -1, -1,  0, -1, -1, -1],
        [-1,  0,  0,  0,  0,  0,  0,  0,  0, -1],
        [-1,  0, -1, -1, -1, -1, -1, -1,  0, -1],
        [-1,  0,  0,  0,  0,  0,  0, -1,  0, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

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