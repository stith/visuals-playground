import p5 from 'p5';

export function flickyDiamonds(width: number, height: number, frameRendered: Function) {
  const count = 10;
  const gap = 9;
  const fullWidth = width / count;
  const fullHeight = height / count;
  const oneWidth = fullWidth - (gap * 2);
  const oneHeight = fullHeight - (gap * 2);
  const halfW = oneWidth / 2;
  const halfH = oneHeight / 2;

  const maxSkew = 7;
  let skew = {x: 0, y: 0};
  let skewCounter = {x: 0, y: 0};

  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(width, height);
    };

    p.draw = () => {
      p.clear();
      p.noStroke();
      skewCounter.x = (skewCounter.x + 0.9) % (Math.PI * 2); // Math.random() * 0.1;
      skewCounter.y = (skewCounter.y + 0.9) % (Math.PI * 2); // Math.random() * 0.1;
      skew.x = Math.sin(skewCounter.x) * maxSkew;
      skew.y = Math.sin(skewCounter.y) * maxSkew;
      for (var x = 0; x <= count + 1; x++) {
        for (var y = 0; y <= count + 1; y++) {
          p.push();

          p.translate(
            x * fullWidth - (fullWidth / 2),
            y * fullHeight - (fullHeight / 2),
          );

          p.quad(
            -halfW + skew.x, -halfH + skew.y,
            halfW  + skew.x, -halfH - skew.y,
            halfW  - skew.x, halfH  - skew.y,
            -halfW - skew.x, halfH  + skew.y,
          );
          p.pop();
        }
      }
      frameRendered();
    };
  };
}