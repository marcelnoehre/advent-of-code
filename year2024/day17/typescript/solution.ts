import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
const { r, p } = input.reduce((acc, row) => {
  if (row.startsWith("Register")) acc.r[row.split(": ")[0].slice(-1)] = +row.split(": ")[1];
  else if (row.startsWith("Program")) acc.p = row.split(": ")[1].split(',').map(Number);
  return acc;
}, { r: {}, p: [] });
const co = (op: number, tr: Record<string, number>) => op >= 4 && op <= 6 ? tr[String.fromCharCode(65 + (op - 4))] : op;
const ops: Record<number, (tr: Record<string, number>, p: number[], i: number, o: number[]) => number> = {
  0: (tr, p, i) => { tr['A'] = Math.floor(tr['A'] / (2 ** co(p[i + 1], tr))); return i + 2; },
  1: (tr, p, i) => { tr['B'] ^= p[i + 1]; return i + 2; },
  2: (tr, p, i) => { tr['B'] = co(p[i + 1], tr) % 8; return i + 2; },
  3: (tr, p, i) => (tr['A'] !== 0 ? p[i + 1] : i + 2),
  4: (tr, p, i) => { tr['B'] ^= tr['C']; return i + 2; },
  5: (tr, p, i, o) => { o.push(co(p[i + 1], tr) % 8); return i + 2; },
  6: (tr, p, i) => { tr['B'] = Math.floor(tr['A'] / (2 ** co(p[i + 1], tr))); return i + 2; },
  7: (tr, p, i) => { tr['C'] = Math.floor(tr['A'] / (2 ** co(p[i + 1], tr))); return i + 2; },
};
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): string {
  let [i, o] = [0, []];
  while(i < p.length) i = ops[p[i]](r, p, i, o);
  return o.join();
}

export function part_2(): number {
  let ca = 1;
  while (true) {
    let [i, tr, o] = [0, { A: ca, B: 0, C: 0 }, []];
    while (i < p.length) i = ops[p[i]](tr, p, i, o);
    if (o.join(',') === p.join(',')) return ca;
    ca++;
  }
}
