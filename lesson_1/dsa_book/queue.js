class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
  }
  peek() {
    return this.front ? this.front.val : null;
  }

  enqueue(value) {
    const newNode = new ListNode(value);

    if (!this.back) {
      this.front = newNode;
      this.back = this.front;
    } else {
      this.back.next = newNode;
      this.back = this.back.next;
    }
  }

  dequeue() {
    if (!this.front) return null;

    let dequeuedValue = this.front.val;
    this.front = this.front.next;
    if (!this.front) this.back = null;

    return dequeuedValue;
  }
}

const myQueue = new Queue();
console.log(myQueue.enqueue(1));
console.log('Front element:', myQueue.peek());  // logs 'Front element: 1'
console.log(myQueue.enqueue(2));
console.log('Front element:', myQueue.peek());  // logs 'Front element: 1'
myQueue.enqueue(3);
console.log('Front element:', myQueue.peek());  // logs 'Front element: 1'
console.log(myQueue.dequeue());
console.log('Front element after dequeue:', myQueue.peek());  // logs 'Front element after dequeue: 2'
console.log(myQueue.dequeue());
console.log('Front element after dequeue:', myQueue.peek());  // logs 'Front element after dequeue: 3'
console.log(myQueue.dequeue());
console.log('Peek on empty queue:', myQueue.peek());  // logs 'Peek on empty queue: null'
console.log('`back` on empty queue:', myQueue.back);  // logs '`back` on empty queue: null'