export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* swap two array elements and update their states */
export async function exchange(arr, i, j, algorithm) {
  algorithm.states[i] = 'being exchanged';
  algorithm.states[j] = 'being exchanged';
  await sleep(algorithm.info.sleepDelay);

  let swap = arr[i];
  arr[i] = arr[j];
  arr[j] = swap;
  algorithm.info.swaps++;

  algorithm.states[i] = 'being sorted';
  algorithm.states[j] = 'being sorted';
  algorithm.info.updateStats();
}