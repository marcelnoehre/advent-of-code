import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: [string, number][] = file.toString().trim().split('\n').map((line) => [line.split(' ')[0], parseInt(line.split(' ')[1], 10)]);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce(([h, d], [ac, v]) => ac === 'forward' ? [h + v, d] : ac === 'down' ? [h, d + v] : [h, d - v], [0, 0]).reduce((a, b) => a * b);
}

export function part_2(): number {
  return input.reduce(([h, d, a], [ac, v]) => (ac === 'forward' ? [h + v, d + a * v, a] : ac === 'down' ? [h, d, a + v] : [h, d, a - v]), [0, 0, 0]).slice(0, 2).reduce((a, b) => a * b);
}