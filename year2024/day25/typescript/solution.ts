import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
}

export function part_1(): number {
  return input.reduce(([l, k], g) => {(g.split('\n').map(row => row.split(''))[0].every(c => c === '#') ? l : k).push(g.split('\n').map(row => row.split(''))[0].map((_, col) => g.split('\n').map(row => row.split('')).reduce((acc, row) => acc + (row[col] === '#' ? 1 : 0), 0) - 1)); return [l, k]; }, [[], []] as number[][][])[0].reduce((acc, l) => acc + input.reduce(([l, k], g) => {(g.split('\n').map(row => row.split(''))[0].every(c => c === '#') ? l : k).push(g.split('\n').map(row => row.split(''))[0].map((_, col) => g.split('\n').map(row => row.split('')).reduce((acc, row) => acc + (row[col] === '#' ? 1 : 0), 0) - 1)); return [l, k]; }, [[], []] as number[][][])[1].filter(k => l.every((l, i) => l + k[i] < 6)).length, 0);
}

