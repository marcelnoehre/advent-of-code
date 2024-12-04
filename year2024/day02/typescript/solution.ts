import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.trim().split('\n').map(l => l.split(' ').map(Number));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.filter(isSafe).length;
}

export function part_2(): number {
  return input.filter(r => isSafe(r) || r.some((_, i) => isSafe(r.filter((_, j) => j !== i)))).length;
}

function isSafe(levels: number[]): boolean {
  const diffs = levels.slice(1).map((n, i) => n - levels[i]);
  return (
    diffs.every(d => Math.abs(d) >= 1 && Math.abs(d) <= 3) &&
    (diffs.every(d => d > 0) || diffs.every(d => d < 0))
  );
}
