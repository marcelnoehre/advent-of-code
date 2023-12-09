import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().split('\n').map(row => row.split(' ').map(Number));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const ex = arr => arr.every(x => x === 0) ? 0 : arr[arr.length - 1] + ex(arr.slice(1).map((y, i) => y - arr[i]));
  return input.reduce((acc, arr) => acc + ex(arr), 0);
}

export function part_2(): number {
  const ex = arr => arr.every(x => x === 0) ? 0 : arr[0] - ex(arr.slice(1).map((y, i) => y - arr[i]));
  return input.reduce((acc, arr) => acc + ex(arr), 0);
}