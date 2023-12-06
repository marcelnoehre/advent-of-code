import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n').map(row => row.split(/:\s+/)[1]);
const races: [number[][], number[]] = [input.map(row => row.split(/\s+/).map(Number)), input.map(row => Number(row.replace(/\s+/g, '')))]
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return races[0][0].reduce((sum, _, rnd) => sum * Array.from({ length: races[0][0][rnd] + 1 }, (_, i) => (races[0][0][rnd] - i) * i > races[0][1][rnd]).filter(Boolean).length, 1);
}

export function part_2(): number {
  return Array.from({ length: races[1][0] }, (_, i) => (races[1][0] - i) * i > races[1][1]).filter(Boolean).length;
}