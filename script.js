const visualizer = document.getElementById('visualizer');
const generateArrayBtn = document.getElementById('generate-array');
const sortBtns = document.querySelectorAll('.sort-btn');
const speedSlider = document.getElementById('speed-slider');
const sizeSlider = document.getElementById('size-slider');

let array = [];
let speed = 50;
let size = 100;

// Generate a new random array
function generateArray() {
    array = [];
    visualizer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 300) + 5);
    }
    renderArray();
}

// Render the array as bars
function renderArray() {
    visualizer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${array[i]}px`;
        visualizer.appendChild(bar);
    }
}

// Sleep function to control animation speed
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            const bars = document.querySelectorAll('.bar');
            bars[j].style.backgroundColor = '#ff0000';
            bars[j + 1].style.backgroundColor = '#ff0000';

            await sleep(101 - speed);

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();
            }

            bars[j].style.backgroundColor = '#007bff';
            bars[j + 1].style.backgroundColor = '#007bff';
        }
    }
}

// Placeholder for other sorting algorithms
async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < array.length; j++) {
            const bars = document.querySelectorAll('.bar');
            bars[j].style.backgroundColor = 'yellow';
            bars[min_idx].style.backgroundColor = 'red';
            await sleep(101 - speed);

            if (array[j] < array[min_idx]) {
                bars[min_idx].style.backgroundColor = '#007bff';
                min_idx = j;
            } else {
                bars[j].style.backgroundColor = '#007bff';
            }
        }

        [array[i], array[min_idx]] = [array[min_idx], array[i]];
        renderArray();

        const newBars = document.querySelectorAll('.bar');
        for (let k = 0; k <= i; k++) {
            newBars[k].style.backgroundColor = 'green';
        }
        await sleep(101 - speed);
    }
    const finalBars = document.querySelectorAll('.bar');
    for (let k = 0; k < array.length; k++) {
        finalBars[k].style.backgroundColor = 'green';
    }
}
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        const bars = document.querySelectorAll('.bar');
        bars[i].style.backgroundColor = 'red';
        await sleep(101 - speed);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j]}px`;
            bars[j].style.backgroundColor = 'yellow';
            await sleep(101 - speed);
            bars[j].style.backgroundColor = 'green';
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[i].style.backgroundColor = 'green';
    }
    const finalBars = document.querySelectorAll('.bar');
    for (let k = 0; k < array.length; k++) {
        finalBars[k].style.backgroundColor = 'green';
    }
}
async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
    const finalBars = document.querySelectorAll('.bar');
    for (let k = 0; k < array.length; k++) {
        finalBars[k].style.backgroundColor = 'green';
    }
}

async function mergeSortHelper(l, r) {
    if (l >= r) {
        return;
    }
    const m = Math.floor((l + r) / 2);
    await mergeSortHelper(l, m);
    await mergeSortHelper(m + 1, r);
    await merge(l, m, r);
}

async function merge(l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = array[l + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = array[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    const bars = document.querySelectorAll('.bar');

    while (i < n1 && j < n2) {
        bars[l + i].style.backgroundColor = 'red';
        bars[m + 1 + j].style.backgroundColor = 'yellow';
        await sleep(101 - speed);

        if (L[i] <= R[j]) {
            array[k] = L[i];
            bars[k].style.height = `${L[i]}px`;
            i++;
        } else {
            array[k] = R[j];
            bars[k].style.height = `${R[j]}px`;
            j++;
        }
        bars[k].style.backgroundColor = 'green';
        k++;
    }

    while (i < n1) {
        array[k] = L[i];
        bars[k].style.height = `${L[i]}px`;
        bars[k].style.backgroundColor = 'green';
        i++;
        k++;
    }

    while (j < n2) {
        array[k] = R[j];
        bars[k].style.height = `${R[j]}px`;
        bars[k].style.backgroundColor = 'green';
        j++;
        k++;
    }
}
async function quickSort() {
    await quickSortHelper(0, array.length - 1);
    const finalBars = document.querySelectorAll('.bar');
    for (let k = 0; k < array.length; k++) {
        finalBars[k].style.backgroundColor = 'green';
    }
}

async function quickSortHelper(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
    }
}

async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;

    const bars = document.querySelectorAll('.bar');
    bars[high].style.backgroundColor = 'red';

    for (let j = low; j <= high - 1; j++) {
        bars[j].style.backgroundColor = 'yellow';
        await sleep(101 - speed);

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
            bars[i].style.backgroundColor = 'orange';
            if (i !== j) bars[j].style.backgroundColor = 'pink';
            await sleep(101 - speed);
        } else {
            bars[j].style.backgroundColor = 'pink';
        }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;

    for(let k=low; k<=high; k++) {
      if(k !== i+1) bars[k].style.backgroundColor = '#007bff';
    }

    return i + 1;
}

// Event Listeners
generateArrayBtn.addEventListener('click', generateArray);
speedSlider.addEventListener('input', (e) => speed = e.target.value);
sizeSlider.addEventListener('input', (e) => {
    size = e.target.value;
    generateArray();
});

sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const sortType = btn.dataset.sort;
        switch (sortType) {
            case 'bubble':
                bubbleSort();
                break;
            case 'selection':
                selectionSort();
                break;
            case 'insertion':
                insertionSort();
                break;
            case 'merge':
                mergeSort();
                break;
            case 'quick':
                quickSort();
                break;
        }
    });
});

// Initial array generation
generateArray();