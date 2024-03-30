import { readFileSync } from 'node:fs';
import 'regenerator-runtime/runtime';
import { mincut } from '@graph-algorithm/minimum-cut';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
}

export function part_1(): number {
  const [m, g] = [{},[]];
  input.forEach((row) => {
    const [l, ...r] = row.match(/\w+/g);
    m[l] ??= new Set();
    for (const i of r) {
      g.push([l, i]);
      m[l].add(i);
      m[i] ??= new Set();
      m[i].add(l);
    }
  });
  for (const [a, b] of mincut(g)) {
    m[a].delete(b);
    m[b].delete(a);
  }
  return group(m, Object.keys(m)[0]).size * (Object.keys(m).length - group(m, Object.keys(m)[0]).size);
}

function group(m, k) {
  function keys(k, g) { for (const y of k) if (!g.has(y)) keys(m[y], g.add(y)) };
  const g = new Set([k]);
  keys(m[k], g);
  return g;
}
