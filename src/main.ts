import p5 from 'p5';

import { diamonds } from './sketches/diamonds';
import { diamondsInCircles } from './sketches/diamonds-in-circles';
import { flickyDiamonds } from './sketches/flicky-diamonds';
import { hexagon } from './sketches/hexagons';
import { spinSquares } from './sketches/spin-squares';
import { tree } from './sketches/tree';

const WIDTH = 500;
const HEIGHT = 500;

const defaultSketch = 'diamonds';
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
  hexagons: {
    name: 'Hexagons',
    fn: hexagon,
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
  currentSketch = new p5(sketches[sketch].fn(window.innerWidth, window.innerHeight, frameRendered), canvasRef);
};

const capturer = new CCapture({format: 'png', display: true});
const frameRendered = () => {
  const canvasRef = document.getElementById('defaultCanvas0');
  capturer.capture(canvasRef);
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

  switchSketch(defaultSketch);

  // Bind recording button
  const recButton = document.getElementById('record') as HTMLButtonElement;
  recButton.onclick = () => {
    if (recButton.getAttribute('data-recording') === 'true') {
      capturer.stop();
      capturer.save();
      recButton.setAttribute('data-recording', 'false');
      recButton.innerText = 'Record';
    } else {
      capturer.start();
      recButton.setAttribute('data-recording', 'true');
      recButton.innerText = 'Stop';
    }
  };
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === ' ') {
      const container = document.getElementById('container');
      container.hidden = !container.hidden;
    }
  });
});
