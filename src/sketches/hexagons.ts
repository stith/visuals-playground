import p5 from 'p5';

import { polygon } from '../utilities/shapes';

export function hexagon(width: number, height: number, frameRendered: Function) {
  return (p: p5) => {
    let angleSlider: p5.Element;

    p.setup = () => {
      p.createCanvas(width, height);
    };

    p.draw = () => {
      p.clear();
      polygon(p, 100, 100, 50, 6);
    };
  };
}