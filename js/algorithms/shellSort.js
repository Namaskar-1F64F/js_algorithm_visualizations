import { exchange } from '../util.js';
import { AlgorithmStats } from './algorithmStats.js';

export class ShellSort {
    async sort(arr, states, delay) {
        this.states = states;
        this.info = new AlgorithmStats(delay);
        await this.ssort(arr);
        this.info.calculateRuntime();
    }

    async ssort(arr) {
        let n = arr.length;

        let h = 1;
        while (h < n/3) h = 3*h + 1; // initialize Knuth gap sequence
        
        while (h >= 1) {
            for (let i = h; i < n; i++) {
                this.states[i] = 'being sorted';
                for (let j = i; j >= h && (arr[j] < arr[j-h]); j -= h) {
                    this.info.compares++;
                    await exchange(arr, j, j-h, this);
                }
                this.info.compares++;
            }

            this.states.fill('default');
            h = Math.floor(h / 3);
        }
    }

    updateInfoFields() {
        $('#alg-name').text('Shell Sort');
        $('#alg-about').text("Shell sort first compares items far apart and then reduces this gap with each successive loop. It requires fewer swaps on average and will reduce to insertion sort once the array is mostly sorted. Choosing an efficient set of swap gaps is a surprisingly tricky mathematical endeavor. The true time complexity of this algorithm remains unknown.");
        $('#alg-best').text('n log3 n');
        $('#alg-avg').text('n/a');
        $('#alg-worst').text('c n^3/2');
        $('#alg-place').text('yes');
        $('#alg-stable').text('no');
    }
}