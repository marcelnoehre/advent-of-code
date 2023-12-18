import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: any[] = file.toString().split(/\r?\n/).map((line, y) => line.split("").map((char, x) => ({ x, y , cost: Number(char), key: `${x};${y}` }))).flat();
let [wb, mx, my] = [Object.fromEntries(input.map(item => [item.key, item])), Math.max(...input.map(b => b.x)), Math.max(...input.map(b => b.y))];
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return calc(0, 3);
}

export function part_2(): number {
  return calc(4, 10);
}

function calc(minMoves, maxMoves) {
  let [cost, seen, es, ne] = [0, new Set<string>(), [[0,0,1,0,0,0],[0,0,0,1,0,0]], []];
  while (es.length > 0) {
    for (const e of es) {
      if (seen.has(e.slice(0, 5).join(';'))) continue;
      if (e[5] > cost) {
        ne.push(e); 
        continue;
      }
      if (e[0] === mx && e[1] === my && e[4] >= minMoves) return e[5];
      seen.add(e.slice(0, 5).join(';'));
      if (e[4] < maxMoves && wb[`${e[0] + e[2]};${e[1] + e[3]}`]) ne.push([e[0] + e[2], e[1] + e[3], e[2], e[3], e[4] + 1, e[5] + wb[`${e[0] + e[2]};${e[1] + e[3]}`].cost]);
      if (e[4] >= minMoves) (e[3] === 0 ? [[0, -1], [0, 1]] : [[1, 0], [-1, 0]]).forEach(turn => { if (wb[`${e[0] + turn[0]};${e[1] + turn[1]}`]) ne.push([e[0] + turn[0], e[1] + turn[1], turn[0], turn[1], 1, e[5] + wb[`${e[0] + turn[0]};${e[1] + turn[1]}`].cost]) });
    }
    [es, cost, ne] = [ne, cost + 1, []];
  }
}
