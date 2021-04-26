import p5 from 'p5';

// https://p5js.org/examples/form-regular-polygon.html
export function polygon(p: p5, x: number, y: number, radius: number, npoints: number) {
  let angle = p.TWO_PI / npoints;
  p.beginShape();
  for (let a = 0; a < p.TWO_PI; a += angle) {
    let sx = x + p.cos(a) * radius;
    let sy = y + p.sin(a) * radius;
    p.vertex(sx, sy);
  }
  p.endShape(p.CLOSE);
}
