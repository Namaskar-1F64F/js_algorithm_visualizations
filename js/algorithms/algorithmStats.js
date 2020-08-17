export class AlgorithmStats {
    constructor(delay) {
        this.sleepDelay = delay;
        this.compares = 0;
        this.swaps = 0;
        this.startTime = performance.now();
        this.endTime;
        this.runtime = 0; // in ms
        $("#alg-runtime").text("running...");
    }

    updateStats() {
        $("#alg-compares").text(this.compares);
        $("#alg-swaps").text(this.swaps);
    }

    calculateRuntime() {
        this.endTime = performance.now();
        this.runtime = this.endTime - this.startTime;
        $("#alg-runtime").text(Math.floor(this.runtime) + "ms");
    }
}