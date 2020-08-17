import { exchange } from '../util.js';
import { AlgorithmStats } from './algorithmStats.js';

export class SelectionSort {
    async sort(arr, states, delay) {
        this.states = states;
        this.info = new AlgorithmStats(delay);
        await this.ssort(arr);
        this.info.calculateRuntime();
    }

    async ssort(arr) {
        let n = arr.length;
        for (let i = 0; i < n; i++) {
            this.states[i] = 'being sorted';
        }
        
        for (let i = 0; i < n; i++) {
            let min = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[min]) min = j;
                this.info.compares++;
            }
            await exchange(arr, i, min, this);
            this.states[i] = 'default';
        }
    }

    updateInfoFields() {
        $('#alg-name').text('Selection Sort');
        $('#alg-about').text("One of the simplest sorting methods, selection sort scans the array for the smallest item and places it in position one. It then moves up one position and repeats itself. While not impressively efficient, selection sort guarantees one swap per array entry, so it can be useful in cases where swapping is expensive.");
        $('#alg-best').text('1/2 n^2');
        $('#alg-avg').text('1/2 n^2');
        $('#alg-worst').text('1/2 n^2');
        $('#alg-place').text('yes');
        $('#alg-stable').text('no');
    }
}