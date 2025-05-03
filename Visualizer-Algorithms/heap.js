// Binary Heap Functions (Priority Queue)
export function heapifyUp(heap, index) {
    while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (heap[parentIndex][1] <= heap[index][1]) break;
        [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
        index = parentIndex;
    }
}

export function heapifyDown(heap, index) {
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

export function enqueue(heap, value, priority) {
    heap.push([value, priority]);
    heapifyUp(heap, heap.length - 1);
}

export function dequeue(heap) {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();
    let min = heap[0];
    heap[0] = heap.pop();
    heapifyDown(heap, 0);
    return min;
}