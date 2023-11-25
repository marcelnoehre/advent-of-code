import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: any[][] = file.toString().split('\n\n').map((pair) => pair.split('\n').map((item) => JSON.parse(item)));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((sum, curr, i) => compare(curr[0], curr[1]) ? sum + i + 1 : sum, 0);
}

export function part_2(): number {
  const tmp = [[[2]], [[6]]].concat(...input).sort((a, b) => compare(a, b) ? -1 : 1);
  return ((tmp.findIndex(item => JSON.stringify(item) === JSON.stringify([[2]])) + 1) ?? 1) * ((tmp.findIndex(item => JSON.stringify(item) === JSON.stringify([[6]])) + 1) ?? 1);
}

function compare(a: any, b: any): boolean | null {
  if (typeof a === 'number' && typeof b === 'number') return a < b ? true : a > b ? false : null;
  if (typeof a === 'number') a = [a];
  if (typeof b === 'number') b = [b];
  for (let i = 0; i < Math.min(a.length, b.length); i++) if(compare(a[i], b[i]) !== null) return compare(a[i], b[i]);
  return a.length < b.length ? true : a.length > b.length ? false : null;
}