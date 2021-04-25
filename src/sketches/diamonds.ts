import p5 from 'p5';

export function diamonds(width: number, height: number) {
  const count = 10;
  const gap = 2;
  let skew = {x: 0, y: 0};
  const maxSkew = 20;
  let skewCounter = {x: 0, y: 0};
  const fullWidth = width / count;
  const fullHeight = height / count;
  const oneWidth = fullWidth - (gap * 2);
  const oneHeight = fullHeight - (gap * 2);
  const halfW = oneWidth / 2;
  const halfH = oneHeight / 2;

  

  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(width, height);
      p.angleMode(p.DEGREES);
    };

    p.draw = () => {
      p.clear();
      // p.fill(128);
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
    };
  };
}