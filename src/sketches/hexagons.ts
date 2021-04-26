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
      p.noStroke();
      p.push();
      p.translate(100, 100);
      const frameProg = normalize((p.frameCount * rotateSpeed) % 360, 0, 360, 0, Math.PI * 2);
      p.rotate(frameProg);
      polygon(p, 0, 0, 90, 6);
      p.rotate((-frameProg) * 2);
      p.fill(128);
      polygon(p, 0, 0, 75, 6);
      p.rotate(frameProg + (frameProg / 3));
      p.fill(48);
      polygon(p, 0, 0, 60, 6);
      p.rotate((-frameProg) * 2);
      p.fill(255);
      polygon(p, 0, 0, 50, 6);
      p.pop();
      frameRendered();
    };
  };
}