import p5 from 'p5';

const WIDTH = 500;
const HEIGHT = 500;

var sketch = (p: p5) => {
  const x = 100;
  const y = 100;
  let rotateA = 0;
  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.angleMode(p.DEGREES);
  };

  p.draw = () => {
    p.clear();
    var count = 10;
    var gap = 3;
    var wSize = (WIDTH + gap * 2) / count;
    var hSize = (HEIGHT + gap * 2) / count;
    rotateA += 2;
    rotateA = rotateA % 360;
    for (var x = 0; x <= count; x++) {
      p.push();
      for (var y = 0; y <= count; y++) {
        p.push();
        p.translate(x * (wSize), y * (hSize));
        p.rotate(rotateA);
        p.rect(-(wSize / 2) + gap, -hSize / 2 + gap, wSize - gap * 2, hSize - gap * 2);
        p.pop();
      }
      p.pop();
    }
  };
};

new p5(sketch);