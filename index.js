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

class PriorityQueueItem {
    /**
     *
     * @param value
     * @param {number} priority
     */
    constructor(value, priority) {
        this._value = value;
        this._priority = priority;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Property value must be a number');
        }
        if (value < 0 || !Number.isInteger(value)) {
            throw new RangeError('Your priority value does not fit');
        }
        this._priority = value;
    }
}

class PriorityQueue extends Queue {
    constructor() {
        super();
    }

    enqueue(...rest) {
        let QElement;
        if (rest.length === 1) {
            QElement = rest;
        } else if (rest.length === 2) {
            QElement = new PriorityQueueItem(rest[0], rest[1]);
        }

        if (this.isEmpty) {
            this[0] = QElement;
        } else {
            for (let i = this.size - 1; i >= 0; i--) {
                if (QElement.priority > this[i].priority) {
                    this[i + 1] = this[i];
                } else if (QElement.priority <= this[i].priority) {
                    this[i + 1] = QElement;
                    break;
                }
                if (i === 0) {
                    this[this.size] = QElement;
                    break;
                }
            }
        }
        return ++this.size;
    }

}

const q = new PriorityQueue();
q.enqueue('n1', 5);
q.enqueue('n4', 1);
q.enqueue('n2', 4);
q.enqueue('n3', 2);
q.enqueue(new PriorityQueueItem('n5', 0));
console.log(q);
