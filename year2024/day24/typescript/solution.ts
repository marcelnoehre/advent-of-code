import { readFileSync } from 'fs';

const file = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string = file.toString();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const [g, v, o] = [{}, {}, {}]
  const calc = (n: string): number => { return n in v ? v[n] : (o[n] === 'AND' ? calc(g[n][0]) & calc(g[n][1]) : o[n] === 'OR' ? calc(g[n][0]) | calc(g[n][1]) : calc(g[n][0]) ^ calc(g[n][1]))};
  input.split('\n\n')[0].split('\n').forEach(row => v[row.split(': ')[0]] = Number(row.split(': ')[1]));
  input.split('\n\n')[1].split('\n').forEach(row => { if (row.match(/(\w+) (\w+) (\w+) -> (\w+)/)) o[row.match(/(\w+) (\w+) (\w+) -> (\w+)/)[4]] = o[row.match(/(\w+) (\w+) (\w+) -> (\w+)/)[4]] || row.match(/(\w+) (\w+) (\w+) -> (\w+)/)[2], g[row.match(/(\w+) (\w+) (\w+) -> (\w+)/)[4]] = [row.match(/(\w+) (\w+) (\w+) -> (\w+)/)[1], row.match(/(\w+) (\w+) (\w+) -> (\w+)/)[3]]});
  return parseInt(Object.keys(g).filter(k => k.startsWith('z')).sort().map(k => calc(k).toString()).join('').split('').reverse().join(''), 2);
}

export function part_2(): string {
  const [f, s] = [Object.fromEntries(input.trim().split('\n').map(row => {return [(row.replace(' -> ', ' ').split(' ')[3]), { op: (row.replace(' -> ', ' ').split(' ')[1]), x: (row.replace(' -> ', ' ').split(' ')[0]), y: (row.replace(' -> ', ' ').split(' ')[2]) }]})), []];
  const p = (fs) => { let i = 0; while (v(i, fs)) i++; return i; };
  const v = (n, fs) => { return ((!('z' + n.toString().padStart(2, '0') in fs)) || (fs['z' + n.toString().padStart(2, '0')].op !== 'XOR')) ? false : (n === 0 ? ([fs['z' + n.toString().padStart(2, '0')].x, fs['z' + n.toString().padStart(2, '0')].y].sort().join(',') === 'x00,y00') : (vxor(fs['z' + n.toString().padStart(2, '0')].x, n, fs) && vcb(fs['z' + n.toString().padStart(2, '0')].y, n, fs)) || (vxor(fs['z' + n.toString().padStart(2, '0')].y, n, fs) && vcb(fs['z' + n.toString().padStart(2, '0')].x, n, fs)))};
  const vxor = (w, n, fs) => { return (!(w in fs)) || (fs[w].op !== 'XOR') ? false : [fs[w].x, fs[w].y].sort().join(',') === ['x' + n.toString().padStart(2, '0'), 'y' + n.toString().padStart(2, '0')].sort().join(',')};
  const vdr = (w, n, fs) => { return (!(w in fs)) ? false : (fs[w].op !== 'AND') ? false : [fs[w].x, fs[w].y].sort().join(',') === ['x' + n.toString().padStart(2, '0'), 'y' + n.toString().padStart(2, '0')].sort().join(',')};
  const vcb = (w, n, fs) => { return (!(w in fs)) ? false : (n === 1 ? ((fs[w].op !== 'AND') ? false : [fs[w].x, fs[w].y].sort().join(',') === 'x00,y00') : ((fs[w].op !== 'OR') ? false : (vdr(fs[w].x, n - 1, fs) && vr(fs[w].y, n - 1, fs)) || (vdr(fs[w].y, n - 1, fs) && vr(fs[w].x, n - 1, fs))))};
  const vr = (w, n, fs) => { return (!(w in fs)) || (fs[w].op !== 'AND') ? false : (vxor(fs[w].x, n, fs) && vcb(fs[w].y, n, fs)) || (vxor(fs[w].y, n, fs) && vcb(fs[w].x, n, fs))};
  for (let i = 0; i < 4; i++) {
    let [bs, fd] = [p(f), false];
    for (const x of Object.keys(f)) {
      if (fd) break;
      for (const y of Object.keys(f)) {
        if (x === y) continue;
        [f[x], f[y]] = [f[y], f[x]];
        if (p(f) > bs) { s.push(x, y); fd = true; break; }
        [f[x], f[y]] = [f[y], f[x]];
      }
    }
  }
  return s.sort().join(',');
}
