class Queue {
  constructor(items = []) {
    this.items = items; // Use reference to avoid unnecessary copying
    this.front = 0; // Track the front index
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    return this.items[this.front++]; // Move front index forward
  }

  isEmpty() {
    return this.front >= this.items.length;
  }

  size() {
    return this.items.length - this.front;
  }
}

export default Queue;