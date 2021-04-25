import p5 from 'p5';

// From https://betterprogramming.pub/learning-p5-js-by-making-fractals-cbdcac5c651e

export function tree(width: number, height: number) {
  const branch = (p: p5, length: number, angle: number, weightIn: number) => {
    let weight = weightIn - 1;
    p.strokeWeight(weight);
    p.line(0, 0, 0, -length);
    p.translate(0, -length);
    if (length > 8) {
        p.push();
        p.rotate(angle);
        branch(p, length * 0.67, angle, weight);
        p.pop();
        p.push();
        p.rotate(-angle);
        branch(p, length * 0.67, angle, weight);
        p.pop();
        p.push();
        p.rotate(-angle - angle);
        branch(p, length * 0.67, angle, weight);
        p.pop();
    }
  };

  return (p: p5) => {
    let angleSlider: p5.Element;

    p.setup = () => {
      p.createCanvas(width, height);
      angleSlider = p.createSlider(0, p.TWO_PI, p.PI / 4, 0.01);
      angleSlider.parent(document.getElementById('inputs'));
      angleSlider.size(300);
    };

    p.draw = () => {
      p.clear();
      p.translate(width / 2, height);
      const angle = angleSlider.value() as number / 2;
      p.stroke(50, 250, 50, 128);
      branch(p, 100, angle, 11);
      p.translate(0, -150);
    };
  };
}