import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split("\n").map(line => line.trim().split(""));
const [t, r]: [Set<string>, Set<string>[]] = [new Set<string>(), []];
for (let i = 0; i < input.length; i++) for (let j = 0; j < input[0].length; j++) if (!t.has(`${i},${j}`)) r.push(fr(input, new Set(), t, [i, j]));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const calc = (r: Set<string>): number => {
    let p = 4 * r.size;
    for (const pl of r) for (const [ar, ac] of [[-1,0],[1,0],[0,-1],[0,1]]) if (r.has(`${pl.split(",").map(Number)[0] + ar},${pl.split(",").map(Number)[1] + ac}`)) p -= 1;
    return p;
  };
  return r.reduce((acc, rg) => acc + rg.size * calc(rg), 0);
}

export function part_2(): number {
  const calc = (rg: Set<string>): number => {
    let s = 0;
    for (const pl of rg) {
      const [[r, c], nc] = [pl.split(",").map(Number), [1, 1, 1, 1]];
      for (const [d, cos] of Object.entries({"-1,0":[0,1],"1,0":[2,3],"0,-1":[0,2],"0,1":[1,3]})) if (rg.has(`${r + d.split(",").map(Number)[0]},${c + d.split(",").map(Number)[1]}`)) for (const co of cos) nc[co] = Math.max(0, nc[co] - 2);
      for (const [k, cr] of Object.entries({"1,0,0,1":3,"1,0,0,-1":2,"-1,0,0,-1":0,"-1,0,0,1":1})) if (rg.has(`${r + k.split(",").map(Number)[0]},${c + k.split(",").map(Number)[1]}`) && rg.has(`${r + k.split(",").map(Number)[2]},${c + k.split(",").map(Number)[3]}`) && !rg.has(`${r + k.split(",").map(Number)[0]},${c + k.split(",").map(Number)[3]}`)) nc[cr] += 1;
      s += nc.reduce((a, b) => a + b, 0);
    }
    return s;
  };
  return r.reduce((acc, r) => acc + r.size * calc(r), 0);
}

function fr(f: string[][], p: Set<string>, t: Set<string>, sp: [number, number]): Set<string> {
  if (t.has(`${sp[0]},${sp[1]}`)) return p;
  p.add(`${sp[0]},${sp[1]}`); t.add(`${sp[0]},${sp[1]}`);
  for (const [ar, ac] of [[-1,0],[1,0],[0,-1],[0,1]]) if ((sp[0] + ar) >= 0 && (sp[1] + ac) >= 0 && (sp[0] + ar) < input.length && (sp[1] + ac) < input[0].length && f[(sp[0] + ar)][(sp[1] + ac)] === f[sp[0]][sp[1]]) fr(f, p, t, [(sp[0] + ar), (sp[1] + ac)]);
  return p;
}
