export function sineGenerator(i: number, amplitude: number, freq: number) {
  return amplitude * Math.sin(freq / i);
}

export function normalize(n: number, oldMin: number, oldMax: number, newMin: number = 0, newMax: number = 1) {
  return newMin + (n - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}
