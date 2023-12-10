import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split('\n').map(row => row.split(''));
const start = map => map.flatMap((row, y) => row.flatMap((c, x) => c === 'S' ? [x, y] : []));
const [dirs, tileCons, horCor] = [[[0, -1], [0, 1], [-1, 0], [1, 0]], {'|': [[0, -1], [0, 1]], '-': [[-1, 0], [1, 0]], 'L': [[0, 1], [-1, 0]], 'J': [[0, 1], [1, 0]], '7': [[0, -1], [1, 0]], 'F': [[0, -1], [-1, 0]]}, ['L', 'J', '7', 'F']];
const from = (d, t) => tileCons[t]?.some(([dx, dy]) => dx === d[0] && dy === d[1]) || false;
const to = (d, t) => !!tileCons[t]?.find(([dx, dy]) => dx === -d[0] && dy === -d[1]);
const move = (map, [x, y], [dx, dy]) => to([dx, dy], map[y][x]) && from([dx, dy], map[y + dy][x + dx]);
const next = (map, [x, y], seen) => dirs.filter(([dx, dy]) => move(map, [x, y], [dx, dy])).map(([dx, dy]) => [x + dx, y + dy]).find(([nx, ny]) => !seen.find(([x, y]) => x === nx && y === ny));
const isPipe = (x, y, p) => !!p.find(([px, py]) => px === x && py === y);
const build = (map, loc) => {
  const pipe = [];
  while (loc) pipe.push(loc), loc = next(map, loc, pipe);
  return pipe;
};
const fix = (map) => {
  const [x, y] = start(map);
  map[y][x] = Object.entries(tileCons).find(([t, c]) => c.filter(([dx, dy]) => to([-dx, -dy], t) && from([-dx, -dy], map[y - dy][x - dx])).length === 2)[0];
  return map;
}
const cast = (x, y, pipe, map) => {
  let cross = 0, first;
  for (let dx = x; dx >= 0; dx--) {
    if (!isPipe(dx, y, pipe)) continue;    
    if (map[y][dx] === '|') { cross++; continue; }
    if (horCor.includes(map[y][dx])) {
      if (!first) first = map[y][dx];
      else {
        if (tileCons[first][0][1] !== tileCons[map[y][dx]][0][1]) cross++;
        first = null;
      }
    }
  }
  return cross;
};
const area = (map, pipe) => map.reduce((a, row) => a + row.filter((_, x) => !isPipe(x, map.indexOf(row), pipe) && cast(x, map.indexOf(row), pipe, map) % 2).length, 0);

if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return build(fix(input.map(row => row.slice())), start(input.map(row => row.slice()))).length / 2;
}

export function part_2(): number {
  return area(fix(input.map(row => row.slice())), build(fix(input.map(row => row.slice())), start(input.map(row => row.slice()))));
}