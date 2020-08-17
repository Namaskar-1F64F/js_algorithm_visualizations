import { shuffleArray } from './random.js';
import { SortingProgram } from './algorithms/sortingProgram.js';
import { QuickSort } from './algorithms/quickSort.js';
import { BubbleSort } from './algorithms/bubbleSort.js';
import { SelectionSort } from './algorithms/selectionSort.js';
import { InsertionSort } from './algorithms/insertionSort.js';
import { ShellSort } from './algorithms/shellSort.js';
import { MergeSort } from './algorithms/mergeSort.js';

/* sizing values */
const WIDTH = $('#p5js').width();
const HEIGHT = $('#p5js').height();
const BAR_FLOOR = HEIGHT;

let barWidth; // dependent on number of bars

/* color values */
const BG_COLOR = [0,0,0];
const DEFAULT_BAR_COLOR = [170,170,170];
const BEING_SORTED_BAR_COLOR = [255,255,255];
const BEING_EXCHANGED_BAR_COLOR = [75,255,75];
const PARTITION_BAR_COLOR = [255,50,50]

/* array to be sorted */
let values = [];
let states = [];

/* sliders */
const itemCountSlider = $('#itemCountSlider');
const delaySlider = $('#delaySlider');

/* algorithm managment */
let sortingProgram = new SortingProgram(values, states, delaySlider.attr('value'));;
let sortingAlgorithm = new QuickSort();

/* called once when program starts to initialize p5js environment */
window.setup = () => {
  let renderer = createCanvas(WIDTH, HEIGHT);
  renderer.parent('p5js');

  sortingAlgorithm.updateInfoFields();
  updateSliderInfoFields();
  setupArray();
  setBarWidth();
  toggleInputs(true);
}

/* called continuously to render visuals to parent container */
window.draw = () => {
  background(BG_COLOR);
  for (let i = 0; i < values.length; i++) {
    drawBarWithState(i);
  }
}

/* render single bar to correct screen location with correct color */
function drawBarWithState(i) {
  if (states[i] == 'default') {
    fill(DEFAULT_BAR_COLOR);
  } else if (states[i] == 'partition') {
    fill(PARTITION_BAR_COLOR);
  } else if (states[i] == 'being exchanged') {
    fill(BEING_EXCHANGED_BAR_COLOR);
  } else if (states[i] == 'being sorted') {
    fill(BEING_SORTED_BAR_COLOR);
  }
  rect(i * barWidth, BAR_FLOOR - values[i] - 2, barWidth, values[i] + 2);
}

/* render slider values to appropriate text fields */
function updateSliderInfoFields() {
  $('#alg-items').text(itemCountSlider.attr('value'));
  $('#alg-delay').text(delaySlider.attr('value'));
}

/* initialize array to be sorted and shuffles values */
function setupArray() {
  values = new Array(parseInt(itemCountSlider.attr('value')));
  for (let i = 0; i < values.length; i++) {
    values[i] = i;
    states[i] = 'default';
  }
  shuffleArray(values);
}

function setBarWidth() {
  barWidth = WIDTH / itemCountSlider.attr('value');
}

$("#run").click(async function() {
  toggleInputs(false);
  await sort();
  toggleInputs(true);
});

/* sort values based on currently selected sorting algorithm */
async function sort() {
  sortingProgram = new SortingProgram(values, states, delaySlider.attr('value'));
  await sortingProgram.runSort(sortingAlgorithm);
}

$("#shuffle-items").click(function() {
  shuffleArray(values);
});

/* enable/disable input fields to prevent change during sorting */
function toggleInputs(toggle) {
  if (toggle) {
    $('input').prop('disabled', false);
    $('button').prop('disabled', false);
    $('select').prop('disabled', false);
  } else {
    $('input').prop('disabled', true);
    $('button').prop('disabled', true);
    $('select').prop('disabled', true);
  }
}

/* update text/bars/values when item count slider used */
$('#itemCountSlider').on('input', function() {
  $("#slide-itemCount").text(this.value);
  $("#alg-items").text(this.value);
  this.setAttribute('value', this.value);
  setupArray();
  setBarWidth();
});

/* update delay when delay slider used */
$('#delaySlider').on('input', function() {
  $("#slide-delay").text(this.value);
  $("#alg-delay").text(this.value);
  this.setAttribute('value', this.value);
});

/* instantiate new sorting algorithm when chosen via dropdown */
$('#alg-select').on('change', function() {
  switch(this.value) {
    case 'quick':
      sortingAlgorithm = new QuickSort();
      break;
    case 'merge':
        sortingAlgorithm = new MergeSort();
        break;
    case 'bubble':
      sortingAlgorithm = new BubbleSort();
      break;
    case 'selection':
      sortingAlgorithm = new SelectionSort();
      break;
    case 'insertion':
      sortingAlgorithm = new InsertionSort();
      break;
    case 'shell':
      sortingAlgorithm = new ShellSort();
      break;
    default: break;
  }
  sortingAlgorithm.updateInfoFields();
});