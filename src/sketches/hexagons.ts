import p5 from 'p5';

import { normalize } from '../utilities/math';
import { polygon } from '../utilities/shapes';

export function hexagon(width: number, height: number, frameRendered: Function) {
  return (p: p5) => {
    const rotateSpeed = 0.3;
    p.setup = () => {
      p.createCanvas(width, height);
    };

    p.draw = () => {
      p.clear();
      p.push();
      p.translate(100, 100);
      const frameProg = normalize((p.frameCount * rotateSpeed) % 360, 0, 360, 0, Math.PI * 2);
      p.rotate(frameProg);
      polygon(p, 0, 0, 50, 6);
      p.pop();
      frameRendered();
    };
  };
}