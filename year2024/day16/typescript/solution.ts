import { readFileSync } from 'fs';

const file = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
const dirs = { E: [1, 0, ['S', 'N']], N: [0, -1, ['E', 'W']], W: [-1, 0, ['N', 'S']], S: [0, 1, ['W', 'E']]};
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [w, e, r, h, v, res] = [new Set<string>(), { x: 0, y: 0 }, { x: 0, y: 0, points: 0, dir: 'E' }, [], new Set<string>(), Number.MAX_SAFE_INTEGER];
  for (let i = 0; i < input.length; i++) for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === '#') w.add(`${j},${i}`);
    else if (input[i][j] === 'E') (e.x = j, e.y = i);
    else if (input[i][j] === 'S') (r.x = j, r.y = i);
  }
  h.push(r);
  while (h.length > 0) {
    h.sort((a, b) => a.points - b.points);
    const i = h.shift();
    v.add(`${i.x},${i.y},${i.dir}`);
    for (const dk of [i.dir, ...dirs[i.dir][2]]) {
      const [d, n, p] = [[dirs[dk][0], dirs[dk][1]], { x: i.x + [dirs[dk][0], dirs[dk][1]][0], y: i.y + [dirs[dk][0], dirs[dk][1]][1] }, i.points + (i.dir === dk ? 1 : 1001)];
      if (n.x === e.x && n.y === e.y) {
        if (p < res) res = p;
        continue;
      }
      if (!v.has(`${n.x},${n.y},${dk}`) && !w.has(`${n.x},${n.y}`) && p < res) h.push({x: n.x, y: n.y, dir: dk, points: p});
    }
  }
  return res;
}

export function part_2(): number {
  let [w, e, r, pq, v, res, ls] = [new Set<string>(), { x: 0, y: 0 }, { x: 0, y: 0, points: 0, dir: 'E', path: new Set()}, [], new Set<string>(), new Set<string>(), Number.MAX_SAFE_INTEGER];
  for (let i = 0; i < input.length; i++) for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === '#') w.add(`${j},${i}`);
    else if (input[i][j] === 'E') (e.x = j, e.y = i);
    else if (input[i][j] === 'S') (r.x = j, r.y = i, r.path.add(`${j},${i}`));
  }
  pq.push(r);
  while (pq.length > 0) {
    pq.sort((a, b) => a.points - b.points);
    const i = pq.shift();
    v.add(`${i.x},${i.y},${i.dir}`);
    for (const dirKey of [i.dir, ...dirs[i.dir][2]]) {
      const [d, n, p] = [[dirs[dirKey][0], dirs[dirKey][1]], { x: i.x + [dirs[dirKey][0], dirs[dirKey][1]][0], y: i.y + [dirs[dirKey][0], dirs[dirKey][1]][1] }, i.points + (i.dir === dirKey ? 1 : 1001)];
      if (n.x === e.x && n.y === e.y) {
        if (p <= ls) {
          ls = p;
          i.path.add(`${e.x},${e.y}`);
          for (const p of i.path) res.add(p);
        }
        continue;
      }
      if (!v.has(`${n.x},${n.y},${dirKey}`) && !w.has(`${n.x},${n.y}`) && p < ls) {
        const path = new Set(i.path);
        path.add(`${n.x},${n.y}`);
        pq.push({x: n.x, y: n.y, dir: dirKey, points: p, path});
      }
    }
  }
  return res.size;
}
