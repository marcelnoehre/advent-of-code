import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string = file.toString();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return solve(1);
}

export function part_2(): number {
  return solve(2);
}

function solve(part: number) {
  const [map, initQ] = [{}, []];
  for (const [l, r] of input.split('\n').map(row => row.split(' -> '))) {
    if (l === 'broadcaster') initQ.push(...r.split(', ').map((m) => ({ m, p: 0, f: 'button' })));
    else if (l[0] === '%') map[l.substring(1)] = { k: 'ff', out: r.split(', '), s: 0 };
    else map[l.substring(1)] = { k: 'conj', out: r.split(', '), in: [] };
  }
  for (const m in map) for (const output of map[m].out) if (map[output]?.k === 'conj') map[output].in.push({ m, s: 0 });
  let [btns, i, nP] = [{ xj: null, qs: null, kz: null, km: null }, 0, [0, 0]];
  while (!Object.values(btns).every(Boolean)) {
    const q = [...initQ];
    nP[0]++;
    while (q.length) {
      const { m, p, f } = q.shift();
      nP[p]++;
      if (m in btns && !p) btns[m] ||= i;
      const input = map[m];
      if (!input) continue;
      if (input.k === 'ff') {
        if (!p) {
          input.s = +!input.s;
          q.push(...input.out.map((md) => ({ m: md, p: input.s, f: m })));
        }
      } else {
        input.in = input.in.map((i) => i.m === f ? { m: f, s: p } : i);
        q.push(...input.out.map((md) => ({ m: md, p: +!input.in.every((i) => i.s), f: m })));
      }
    }
    i++;
    if (part === 1 && i === 1000) return nP[0] * nP[1];
  }
  return Object.values(btns).reduce((acc, n) => acc * (n + 1), 1);
}