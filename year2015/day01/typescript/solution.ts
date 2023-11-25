import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input = file.toString();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.split('').reduce((acc, char) => acc + (char === '(' ? 1 : -1), 0);
}

export function part_2(): number {
  return input.split('').findIndex((_, i, a) => a.slice(0, i + 1).reduce((s, c) => s + (c === '(' ? 1 : -1), 0) === -1) + 1;
}