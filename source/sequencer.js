import { sum } from './sum.js';
import { closest } from './closest.js';
import { remove } from './remove.js';
import { copy } from './copy.js';

export function sequencer(simplifiedInput, { assetLength, cuttingEdge, calculationAccuracy }) {
    try {
        const array = copy(simplifiedInput);
        const result = [];
        let stack = [];

        do {
            if (stack.length > 0) {
                const payload = sum(stack);
                const amendment = cuttingEdge * stack.length;
                const difference = assetLength - amendment - payload;
                if (difference > 0) {
                    const next = closest(array, difference, calculationAccuracy);
                    if (next) {
                        remove(array, next);
                        stack.push(next);
                    } else {
                        result.push(stack);
                        stack = [];
                    }
                } else {
                    result.push(stack);
                    stack = [];
                }
            } else {
                const [value] = array;
                stack.push(value);
                remove(array, value);
            }
            if (array.length === 0) {
                result.push(stack);
            }
        } while (array.length > 0);

        return { err: null, result };
    } catch (err) {
        return { err, result: null };
    }
}
