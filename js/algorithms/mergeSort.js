import { sleep } from '../util.js';
import { AlgorithmStats } from './algorithmStats.js';

export class MergeSort {

    async sort(arr, states, delay) {
        this.states = states;
        this.info = new AlgorithmStats(delay);

        let aux = new Array(arr.length);
        await this.msort(arr, aux, 0, arr.length-1);

        this.info.calculateRuntime();
    }

    async msort(arr, aux, lo, hi) {
        if (hi <= lo) return;
        let mid = Math.floor(lo + (hi - lo) / 2);
        await this.msort(arr, aux, lo, mid); // sort left half
        await this.msort(arr, aux, mid+1, hi); // sort right half
        if (!arr[mid] <= arr[mid+1]) await this.merge(arr, aux, lo, mid, hi); // check if sorted before attempting merge
        this.info.compares++;
    }

    async merge(arr, aux, lo, mid, hi) {
        for (let k = lo; k <= hi; k++) {
            this.states[k] = 'being sorted';
            aux[k] = arr[k];
        }

        let i = lo;
        let j = mid+1;

        for (let k = lo; k <= hi; k++) {
            if (i > mid) {
                this.states[k] = 'being exchanged';
                this.states[j] = 'being exchanged';
                arr[k] = aux[j];
                
                await sleep(this.info.sleepDelay);
                this.states[k] = 'being sorted';
                this.states[j++] = 'being sorted';
            } else if (j > hi) {
                this.states[k] = 'being exchanged';
                this.states[i] = 'being exchanged';
                arr[k] = aux[i];
                
                await sleep(this.info.sleepDelay);
                this.states[k] = 'being sorted';
                this.states[i++] = 'being sorted';
            } else if (aux[j] < aux[i]) {
                this.states[k] = 'being exchanged';
                this.states[j] = 'being exchanged';
                arr[k] = aux[j];
                this.info.compares++;
                
                await sleep(this.info.sleepDelay);
                this.states[k] = 'being sorted';
                this.states[j++] = 'being sorted';
            } else { 
                this.states[k] = 'being exchanged';
                this.states[i] = 'being exchanged';
                arr[k] = aux[i];
                
                await sleep(this.info.sleepDelay);
                this.states[k] = 'being sorted';
                this.states[i++] = 'being sorted';
            }
            this.info.swaps++;
            this.info.updateStats();
        }

        for (let k = lo; k <= hi; k++) {
            this.states[k] = 'default';
        }
    }

    updateInfoFields() {
        $('#alg-name').text('Merge Sort');
        $('#alg-about').text("Merge sort is a classic example of divide and conquer. It works by dividing the array into a set of tiny subarrays and merging them together. This way, it avoids doing excess work by tackling small problems instead of larger problems. Many optimizations exist, but here I have only avoided unneeded merging by utilizing an extra comparison.");
        $('#alg-best').text('1/2 n log n');
        $('#alg-avg').text('n log n');
        $('#alg-worst').text('n log n');
        $('#alg-place').text('no');
        $('#alg-stable').text('yes');
    }

}