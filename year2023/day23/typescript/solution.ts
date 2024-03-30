import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const dirs = {'^': [-1, 0], '>': [0, 1], v: [1, 0], '<': [0, -1]};
const input: string[] = file.toString().split('\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [map, max, queue] = [input.map((line) => line.split('')), 0, [[[0, 1].join()]]];
  while (queue.length) {
    const path = queue.shift();
    const [r, c] = path.at(-1).split(',').map(Number);
    for (const char in dirs) {
      if (map[r][c] in dirs && map[r][c] !== char || path.includes([r + dirs[char][0], c + dirs[char][1]].join())) continue;
      if (['.','^','>','v','<'].includes(map[r + dirs[char][0]]?.[c + dirs[char][1]])) queue.push(path.concat([r + dirs[char][0], c + dirs[char][1]].join()));
    }
    if (r === map.length - 1) max = Math.max(max, path.length - 1);
  }
  return max;
}

export function part_2(): number {
  const map = input.map((line) => line.split('').map((char) => { return ['^','>','v','<'].includes(char) ? '.' : char }));
  const [s, e, n, d] = [[0, 1].join(), [map.length - 1, map[0].length - 2].join(), [[0, 1].join() ,[map.length - 1, map[0].length - 2].join()], []]
  for (const node of n) {
    d[node] = {};
    const [r, c] = node.split(',').map(Number);
    function move(ns, prev, r, c) {
      if (map[r]?.[c] !== '.') return;
      const ne = Object.values(dirs).filter(([dr, dc]) => map[r + dr]?.[c + dc] === '.').length;
      if (ns && (ne > 2 || !r || r === map.length - 1)) {
        if (!n.includes([r, c].join())) n.push([r, c].join());
        return d[node][[r, c].join()] = ns;
      }
      if (prev !== 'v' && r) move(ns + 1, '^', r - 1, c);
      if (prev !== '^' && r !== map.length - 1) move(ns + 1, 'v', r + 1, c);
      if (prev !== '>') move(ns + 1, '<', r, c - 1);
      if (prev !== '<') move(ns + 1, '>', r, c + 1);
    }
    move(0, null, r, c);
  }
  let ms = 0;
  function move(steps, node, path) {
    if (node === e) return ms = Math.max(ms, steps);
    path.push(node);
    for (const nn in d[node]) if (!path.includes(nn)) move(steps + d[node][nn], nn, [...path]);
  }
  move(0, s, []);
  return ms;
}
