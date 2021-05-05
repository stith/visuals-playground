export function sineGenerator(i: number, amplitude: number, freq: number) {
  return amplitude * Math.sin(freq / i);
}

export function normalize(n: number, oldMin: number, oldMax: number, newMin: number = 0, newMax: number = 1) {
  return newMin + (n - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

export function ratio(a: number, b: number) {
  for (let i = b; i > 1; i--) {
    if (a % i === 0 && b % i === 0) {
      a = a / i;
      b = b / i;
    }
  }
  return [a, b] as const;
}
