export function sineGenerator(i: number, amplitude: number, freq: number) {
  return amplitude * Math.sin(freq / i);
}