import p5 from 'p5';

export function diamondsInCircles(width: number, height: number) {
  const circles = 7;
  const countPerCircle = 90;
  const size = 40;

  const rotateSpeed = 0.75;
  const maxSkew = 40;
  const skewSpeed = 1.5;

  const degreeStep = 360 / countPerCircle;
  const halfSize = size / 2;

  const usableWidth = width - 30;

  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(width, height);
      p.angleMode(p.DEGREES);
    };

    p.draw = () => {
      p.clear();
      p.noStroke();
      p.push();

      p.translate(width / 2, height / 2);

      const i = ((p.frameCount * skewSpeed) % 360) / 360;
      const offset = (Math.sin(i * Math.PI * 2)) * maxSkew;

      for (let i = 0; i < circles; i++) {
        for (let pos = 0; pos < countPerCircle; pos++) {

          p.push();
          const degree = pos * degreeStep + ((p.frameCount * rotateSpeed) % 360);
          const skewDir = i % 2 === 0 ? 1 : -1;
          p.rotate(degree * skewDir);
          const radiusStep = ((usableWidth / 2) - halfSize) / circles;
          p.translate(0, radiusStep * (i + 1));
          p.quad(
            -skewDir * halfSize + offset, -skewDir * halfSize + offset,
             skewDir * halfSize + offset, -skewDir * halfSize - offset,
             skewDir * halfSize - offset,  skewDir * halfSize - offset,
            -skewDir * halfSize - offset,  skewDir * halfSize + offset,
          );
          p.pop();
        }
      }

      p.pop();
    };
  };
}