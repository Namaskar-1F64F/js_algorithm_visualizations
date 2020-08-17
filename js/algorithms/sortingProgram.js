export class SortingProgram {
    constructor(arr, states, delay) {
        this.arr = arr;
        this.states = states;
        this.delay = delay;
    }

    /* sorts items based on given sorting instance's sort() method */
    async runSort(sortingStrategy) {
        return sortingStrategy.sort(this.arr, this.states, this.delay);
    }
}