import { exchange } from '../util.js';
import { AlgorithmStats } from './algorithmStats.js';

export class BubbleSort {
    async sort(arr, states, delay) {
        this.states = states;
        this.info = new AlgorithmStats(delay);
        await this.bsort(arr);
        this.info.calculateRuntime();
    }

    async bsort(arr) {
        let n = arr.length;
        this.states.fill('being sorted');

        while (n > 1) {
            let sortedAfterIndex = 0;
            for (let i = 1; i < n; i++) {
                if (arr[i - 1] > arr[i]) await exchange(arr, i - 1, i, this);
                this.info.compares++;
                sortedAfterIndex = i;
            }
            this.states[sortedAfterIndex] = 'default';
            n = sortedAfterIndex;
        }
    }

    updateInfoFields() {
        $('#alg-name').text('Bubble Sort');
        $('#alg-about').text("Often used as a teaching tool, bubble sort is very slow. It sorts a given array by comparing neighboring elements and 'bubbling' the larger element up towards the final position. Even with some optimizations, this still lacks efficiency and is not often used in practice.");
        $('#alg-best').text('n');
        $('#alg-avg').text('1/2 n^2');
        $('#alg-worst').text('1/2 n^2');
        $('#alg-place').text('yes');
        $('#alg-stable').text('yes');
    }
}