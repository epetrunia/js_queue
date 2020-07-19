'use strict';

class QueueIterator {
    constructor(queue) {
        this._queue = queue;
        this._start = 0;
    }

    next() {
        if (this._start >= this._queue.size) {
            return {
                value: undefined,
                done: true,
            }
        }
        return {
            value: this._queue[this._start],
            done: this._start++ === this._queue.size,
        }
    }
}

class Queue {
    constructor() {
        this._size = 0;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Size value must be a number');
        }
        if (value < 0 || !Number.isInteger(value)) {
            throw  new RangeError('Your size value does not fit');
        }
        this._size = value;
    }

    get isEmpty() {
        return this._size === 0;
    }

    enqueue(value) {
        this[this._size++] = value;
        return this._size;
    }

    dequeue() {
        if (this.isEmpty) {
            return undefined;
        }
        const value = this[0];
        for (let i = 1; i < this.size; i++) {
            this[i - 1] = this[i];
        }
        delete this[--this.size];
        return value;
    }

    front() {
        return this[0];
    }

    [Symbol.Iterator]() {
        return new QueueIterator(this);
    }
}


const q = new Queue();
for (let i = 0; i < 5; i++) {
    q.enqueue(i);
}
console.log(q);
console.log(q.dequeue());
console.log(q);
console.log(q.front());
