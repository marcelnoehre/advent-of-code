import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [c, st, res] = [setup(), new Set(), 0];
  for(const cn in c) for(let i = 0; i < c[cn].length - 1; i++) for(let j = i + 1; j < c[cn].length; j++) if(c[c[cn][i]].includes(c[cn][j])) {
    const ns = [cn, c[cn][i], c[cn][j]].sort();
    if(!st.has(ns.join()) && ns.some(c => c.startsWith('t'))) res++; st.add(ns.join());
  }
  return res;
}

export function part_2(): string {
  let [c, res] = [setup(), []];
  for(const cn in c) for(let i = 0; i < c[cn].length - 1; i++) {
    let p = [cn, c[cn][i]];
    for(let j = i + 1; j < c[cn].length; j++) if(c[c[cn][i]].includes(c[cn][j]) && p.every(p => c[c[cn][j]].includes(p))) p.push(c[cn][j]);
    if(res.length < p.length) res = p;
  }
  return res.sort().join();
}

function setup() {
  const c = {};
  input.map(d => d.split('-')).forEach(d => {
    [c[d[0]], c[d[1]]] = [c[d[0]] ?? [], c[d[1]] ?? []];
    if(!c[d[0]].includes(d[1])) c[d[0]].push(d[1]);
    if(!c[d[1]].includes(d[0])) c[d[1]].push(d[0]);
  });
  return c;
}
