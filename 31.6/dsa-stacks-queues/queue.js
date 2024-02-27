/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    let node = new Node(val);
    // Edge case first, empty queue
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      // Make node after current last
      this.last.next = node;
      // Assigns last position to new node
      this.last = node;
    }
    this.size++;
    return;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    // 1st edge case, empty queue. Return nothing
    if (!this.first) {
      throw new Error("Queue is empty");
    }
    // 2nd edge case, single queue. Queue becomes nothing
    else if (this.first == this.last) {
      let temp = this.first;
      this.last = null;
      this.first = null;
      this.size--;
      return temp.val;

      // Regular case
    } else {
      let temp = this.first;
      this.first = this.first.next;
      this.size--;
      return temp.val;
    }
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.first === null && this.last === null;
  }
}

module.exports = Queue;
