import { exchange } from '../util.js';
import { AlgorithmStats } from './algorithmStats.js';

export class QuickSort {
    async sort(arr, states, delay) {
        this.states = states;
        this.info = new AlgorithmStats(delay);
        await this.qsort(arr, 0, arr.length - 1);
        this.info.calculateRuntime();
    }

    async qsort(arr, lo, hi) {
        if (hi <= lo) return;

        let n = hi - lo + 1
        let m = this.median3(arr, lo, lo + n/2, hi);
        await exchange(arr, m, lo, this);

        let j = await this.partition(arr, lo, hi); // partition array around first entry

        await this.qsort(arr, lo, j-1),  // sort left of partition
        await this.qsort(arr, j+1, hi)   // sort right of partition
    }

    /* find median of 3 elements in given array */
    median3(arr, i, j, k) {
        let res;
        if (arr[i] < arr[j]) {
            this.info.compares++;
            if (arr[j] < arr[k]) {
                this.info.compares++;
                res = j;
            } else if (arr[i] < arr[k]) {
                this.info.compares++;
                res = k;
            } else {
                res = i;
            }
        } else {
            this.info.compares++;
            if (arr[k] < arr[j]) {
                this.info.compares++;
                res = j;
            } else if (arr[k] < arr[i]) {
                this.info.compares++;
                res = k;
            } else {
                res = i;
            }
        }
        
        return res;
        // concise representation of logic. Not used due to inability to count compares.
        // (arr[i] < arr[j] ?
        // (arr[j] < arr[k] ? j : arr[i] < arr[k] ? k : i) :
        // (arr[k] < arr[j] ? j : arr[k] < arr[i] ? k : i));
    }

    async partition(arr, lo, hi) {
        let i = lo;
        let j = hi + 1;
        let v = arr[lo]; // partition value

        this.states.fill('being sorted', lo, hi);
        this.states[lo] = 'partition';

        while (true) {
            
            // increment left pointer until it finds value above partition
            while (arr[++i] < v) {
                this.info.compares++;
                if (i == hi) break;
            }

            // increment right pointer until it finds value below partition
            while (v < arr[--j]) {
                this.info.compares++;
                if (j == lo) break;
            }

            // pointers crossed; partition complete
            if (i >= j) break;

            // swap elements at pointers
            await exchange(arr, i, j, this);
        }
        
        // place partition element into correct location
        await exchange(arr, lo, j, this);
        this.states.fill('default', lo, hi+1);

        // partition final index
        return j;
    }

    updateInfoFields() {
        $('#alg-name').text('Quick Sort');
        $('#alg-about').text("By partitioning around a 'pivot' element, quick sort efficiently places items in their correct location. It almost guarantees fast performance by introducing randomness. In this implementation, the partition is chosen as a median of 3 values to improve performance further. For even greater optimization, insertion sort can be applied when dealing with small subproblems.");
        $('#alg-best').text('n log n');
        $('#alg-avg').text('2 n ln n');
        $('#alg-worst').text('1/2 n^2');
        $('#alg-place').text('yes');
        $('#alg-stable').text('no');
    }
}