import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: [number, number[]][] = file.toString().split('\n').map(line => [Number(line.split(': ')[0]), line.split(': ')[1].split(' ').map(Number)]);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, [res, num]) => { return rec(res, num[0], num.slice(1), true) ? acc + res : acc; }, 0);
}

export function part_2(): number {
  return input.reduce((acc, [res, num]) => { return rec(res, num[0], num.slice(1), false) ? acc + res : acc; }, 0);
}

function rec(r: number, c: number, n: number[], p: boolean): boolean {
  if (n.length === 0) return r === c;
  if (c > r) return false;
  return (rec(r, c + n[0], n.slice(1), p)) || (rec(r, c * n[0], n.slice(1), p)) || (!p ? rec(r, c * Math.pow(10, n[0] > 0 && !p ? Math.ceil(Math.log10(n[0] + 1)) : 1) + n[0], n.slice(1), p) : false);
}
