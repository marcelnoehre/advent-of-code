import { readFileSync } from 'fs';

const file: any = readFileSync('../puzzle.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
const serialize = (map) => { return Object.keys(map).sort().map(key => `${key}:${map[key].join('')}`).join(',') };
const [start, end, maps] = [{ x: 1, y: 0, steps: 0 }, { x: input[0].length - 2, y: input.length - 1, steps: 0 }, []]; setup();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return simulate(maps, start, end);
}

export function part_2(): number {
  return simulate(maps, start, end, simulate(maps, end, start, simulate(maps, start, end, 0)));
}

function setup(): void {
  let map = { [`${start.x},${start.y - 1}`]: ['#'], [`${end.x},${end.y + 1}`]: ['#'] };
  input.forEach((line, y) => {line.split('').map((cell, x) => {if (cell !== '.') map[`${x},${y}`] = (map[`${x},${y}`] || []).concat([cell])})});
  const serialized = serialize(map);
  do {
    maps.push(map);
    const nxt = {};
    Object.keys(map).forEach((key) => {
      const [x, y] = key.split(',').map(n => +n);
      map[key].forEach((dir) => {
        let pos = key;
        if (dir === '>') pos = `${x === input[0].length - 2 ? 1 : x + 1},${y}`;
        if (dir === '<') pos = `${x === 1 ? input[0].length - 2 : x - 1},${y}`;
        if (dir === 'v') pos = `${x},${y === input.length - 2 ? 1 : y + 1}`;
        if (dir === '^') pos = `${x},${y === 1 ? input.length - 2 : y - 1}`;
        nxt[pos] = (nxt[pos] || []).concat([dir]);
      });
    });
    map = nxt;
  } while (serialize(map) !== serialized);
}

function neighbors(maps, { x, y, steps }) {
  return [{x: x - 1, y, steps: steps + 1},{x: x + 1, y, steps: steps + 1},{x, y: y - 1, steps: steps + 1},{x, y: y + 1, steps: steps + 1},{x, y, steps: steps + 1}].filter(pos => !(maps[(steps + 1) % maps.length][`${pos.x},${pos.y}`] && maps[(steps + 1) % maps.length][`${pos.x},${pos.y}`].length));
}

function simulate(maps, start, end, steps = 0): number {
  let queue = [{ ...start, steps }];
  const visited = new Set();
  while (queue.length > 0) {
    const next = queue.shift();
    if (next.x === end.x && next.y === end.y) return next.steps;
    neighbors(maps, next).forEach((pos) => {
      if (!visited.has(`${pos.x},${pos.y},${pos.steps % maps.length}`)) {
        visited.add(`${pos.x},${pos.y},${pos.steps % maps.length}`);
        queue.push(pos);
      }
    });
  }
}