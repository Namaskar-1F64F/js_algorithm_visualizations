import { exchange } from '../util.js';
import { AlgorithmStats } from './algorithmStats.js';

export class InsertionSort {
    async sort(arr, states, delay) {
        this.states = states;
        this.info = new AlgorithmStats(delay);
        await this.isort(arr);
        this.info.calculateRuntime();
    }

    async isort(arr) {
        let n = arr.length;
        
        for (let i = 1; i < n; i++) {
            this.states[i] = 'being sorted';
            for (let j = i; j > 0 && (arr[j] < arr[j-1]); j--) {
                this.info.compares++;
                await exchange(arr, j, j-1, this);
            }
            this.info.compares++;
        }

        this.states.fill('default');
    }

    updateInfoFields() {
        $('#alg-name').text('Insertion Sort');
        $('#alg-about').text("Insertion sort places items into their correct position relative to any items already processed. It is exceptionally good at sorting arrays with only a few items out of place. As such, it is often used to optimize small subproblems in other sorting methods.");
        $('#alg-best').text('n');
        $('#alg-avg').text('1/4 n^2');
        $('#alg-worst').text('1/2 n^2');
        $('#alg-place').text('yes');
        $('#alg-stable').text('yes');
    }
}