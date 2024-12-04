import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input = file.toString().split('\n').reduce((a, l) => (l.split(/\s+/).map(Number).forEach((n, i) => a[i].push(n)), a), [[], []]).map(arr => arr.sort((x, y) => x - y));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input[0].reduce((a, v, i) => a + Math.abs(v - input[1][i]), 0);
}

export function part_2(): number {
  return input[0].reduce((a, v) => a + v * input[1].filter(n => n === v).length, 0);
}