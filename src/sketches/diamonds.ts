import p5 from 'p5';

export function diamonds(width: number, height: number, frameRendered: Function) {
  const count = 10;
  const gap = 2;
  const fullWidth = width / count;
  const fullHeight = height / count;
  const oneWidth = fullWidth - (gap * 2);
  const oneHeight = fullHeight - (gap * 2);
  const halfW = oneWidth / 2;
  const halfH = oneHeight / 2;

  const maxSkew = 7;
  let skew = {x: 0, y: 0, dia: 0};
  let skewCounter = {x: 0, y: 0, dia: 0};

  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(width, height);
    };

    p.draw = () => {
      p.clear();
      p.noStroke();
      skewCounter.x += 0.1; // Math.random() * 0.3;
      skewCounter.y += 0.1; // Math.random() * 0.3;
      skew.x = Math.sin(skewCounter.x) * maxSkew;
      skew.y = Math.sin(skewCounter.y) * maxSkew;
      skewCounter.x = skewCounter.x % (Math.PI * 2);
      skewCounter.y = skewCounter.y % (Math.PI * 2);
      for (var x = 0; x <= count + 1; x++) {
        for (var y = 0; y <= count + 1; y++) {
          p.push();

          const idx = ((x + y) % 2) === 0 ? 1 : -1;
          const diaDirection = skew.x > 0 ? -1 : 1;

          p.translate(
            x * fullWidth - (fullWidth / 2) - (skew.dia * idx),
            y * fullHeight - (fullHeight / 2) + (skew.dia * idx * diaDirection),
          );


          p.quad(
            -halfW + skew.x, -halfH + skew.y,
            halfW  + skew.x, -halfH - skew.y,
            halfW  - skew.x, halfH  - skew.y,
            -halfW - skew.x, halfH  + skew.y,
          );
          p.stroke(255, 0, 0);
          // p.point(0, 0);
          p.pop();
        }
      }
      frameRendered();
    };
  };
}