import p5 from 'p5';

import { spinSquares } from './sketches/spin-squares';
import { tree } from './sketches/tree';

const WIDTH = 500;
const HEIGHT = 500;

const defaultSketch = 'spinSquares';
const sketches = {
  spinSquares: {
    name: 'Spin Squares',
    fn: spinSquares,
  },
  tree: {
    name: 'Tree fractal',
    fn: tree,
  }
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
  const sketchSelector = document.getElementById('sketchSelect');
  const allKeys = Object.keys(sketches);
  allKeys.forEach((s) => {
    const k = s as keyof typeof sketches;
    const newOption = document.createElement('option');
    newOption.value = s;
    newOption.innerText = sketches[k].name;
    sketchSelector.append(newOption);
  });

  // Bind onChange handler
  sketchSelector.onchange = sketchChange;

  // Set up the sketch renderer
  // const canvasRef = document.getElementById('mainCanvas');
  // canvasRef.setAttribute('width', WIDTH.toString());
  // canvasRef.setAttribute('height', HEIGHT.toString());

  switchSketch(defaultSketch);
});
