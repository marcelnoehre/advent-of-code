import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().trim().split('\n').map((present) => present.split('x').map((value) => parseInt(value, 10)));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.map((box) => box.sort((a, b) => a - b)).reduce((total, [l, w, h]) => total + 2 * (l * w + l * h + w * h) + l * w, 0);
}

export function part_2(): number {
  return input.reduce((total, [l, w, h]) => total + (2 * (l + w) + l * w * h), 0);
}