import p5 from 'p5';

import { ratio } from '../utilities/math';

export function diamonds(canvasWidth: number, canvasHeight: number, frameRendered: Function) {
  // Pattern conf
  const gap = 3;
  const skewSpeed = 0.05;
  const countMultiplier = 2;
  const maxSkew = 7;

  // Calculations
  const aspect = ratio(canvasWidth, canvasHeight);
  let hSquares = aspect[0] * countMultiplier;
  let vSquares = aspect[1] * countMultiplier;
  if (aspect[0] === canvasWidth && aspect[1] === canvasHeight) {
    // If the canvas isn't the right size, just bail and try 16:9
    console.warn('Canvas size', canvasWidth.toString() + 'x' + canvasHeight.toString(), 'not reducable, using 16:9 ratio.');
    hSquares = 16 * countMultiplier;
    vSquares = 9  * countMultiplier;
  }

  const squareW = canvasWidth / hSquares;
  const squareH = canvasHeight / vSquares;

  const innerW = squareW - (gap * 2);
  const innerH = squareH - (gap * 2);
  const halfW = innerW / 2;
  const halfH = innerH / 2;


  let skew = {x: 0, y: 0, dia: 0};
  let skewCounter = {x: 0, y: 0, dia: 0};

  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
    };

    p.draw = () => {
      p.clear();
      p.noStroke();
      skewCounter.x += skewSpeed; // Math.random() * 0.3;
      skewCounter.y += skewSpeed; // Math.random() * 0.3;
      skew.x = Math.sin(skewCounter.x) * maxSkew;
      skew.y = Math.sin(skewCounter.y) * maxSkew;
      skewCounter.x = skewCounter.x % (Math.PI * 2);
      skewCounter.y = skewCounter.y % (Math.PI * 2);
      for (var x = 0; ((x * squareW) <= canvasWidth); x++) {
        for (var y = 0; ((y * squareH) <= canvasHeight); y++) {
          p.push();

          const idx = ((x + y) % 2) === 0 ? 1 : -1;
          const diaDirection = skew.x > 0 ? -1 : 1;

          p.translate(
            x * squareW - (squareW / 2) - (skew.dia * idx),
            y * squareH - (squareH / 2) + (skew.dia * idx * diaDirection),
          );


          p.quad(
            -halfW + skew.x, -halfH + skew.y,
            halfW  + skew.x, -halfH - skew.y,
            halfW  - skew.x, halfH  - skew.y,
            -halfW - skew.x, halfH  + skew.y,
          );
          p.stroke(255, 0, 0);
          p.pop();
        }
      }
      frameRendered();
    };
  };
}