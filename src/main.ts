import p5 from 'p5';

import { diamonds } from './sketches/diamonds';
import { diamondsInCircles } from './sketches/diamonds-in-circles';
import { flickyDiamonds } from './sketches/flicky-diamonds';
import { spinSquares } from './sketches/spin-squares';
import { tree } from './sketches/tree';

const WIDTH = 500;
const HEIGHT = 500;

const defaultSketch = 'diamondsInCircles';
const sketches = {
  spinSquares: {
    name: 'Spin Squares',
    fn: spinSquares,
  },
  tree: {
    name: 'Tree fractal',
    fn: tree,
  },
  diamonds: {
    name: 'Diamonds',
    fn: diamonds,
  },
  flickyDiamonds: {
    name: 'Flicky Diamonds',
    fn: flickyDiamonds,
  },
  diamondsInCircles: {
    name: 'Diamonds in Circles',
    fn: diamondsInCircles,
  },
};

const sketchChange = function(e: Event) {
  const selector = e.target as HTMLSelectElement;
  const newSketch = selector.value as keyof typeof sketches;
  console.log('Switching sketch:', newSketch);
  switchSketch(newSketch);
};

let currentSketch: p5 | null = null;

const switchSketch = (sketch: keyof typeof sketches) => {
  if (currentSketch) {
    currentSketch.remove();
  }
  const canvasRef = document.getElementById('mainCanvas');
  currentSketch = new p5(sketches[sketch].fn(WIDTH, HEIGHT), canvasRef);
};

document.addEventListener('DOMContentLoaded', () => {
  // Populate the sketch selector
  const sketchSelector = document.getElementById('sketchSelect') as HTMLSelectElement;
  const allKeys = Object.keys(sketches);
  let selectedIdx = 0;
  allKeys.forEach((s, i) => {
    const k = s as keyof typeof sketches;
    if (k === defaultSketch) {
      selectedIdx = i;
    }
    const newOption = document.createElement('option');
    newOption.value = s;
    newOption.innerText = sketches[k].name;
    sketchSelector.append(newOption);
  });
  sketchSelector.selectedIndex = selectedIdx;

  // Bind onChange handler
  sketchSelector.onchange = sketchChange;

  // Set up the sketch renderer
  // const canvasRef = document.getElementById('mainCanvas');
  // canvasRef.setAttribute('width', WIDTH.toString());
  // canvasRef.setAttribute('height', HEIGHT.toString());

  switchSketch(defaultSketch);
});
