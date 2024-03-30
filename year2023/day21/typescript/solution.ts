import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string = file.toString();
const dirs = [[-1, 0],[1, 0],[0, -1],[0, 1]];
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return solve(64);
}

export function part_2(): number {
  return solve(26501365);
}

function solve(steps: number) {
  let pos: Set<string> = new Set();
  const map = input.split('\n').map((row, r) =>
    row.split('').map((char, c) => {
      if (char === 'S') pos.add([r, c].join());
      return +(char !== '#');
    })
  );
  const cts = []
  for (let i = 0; i < steps; i++) {
    const nxtPos: Set<string> = new Set();
    for (const p of pos) {
      const [r, c] = p.split(',').map(Number);
      for (const [dr, dc] of dirs) {
        if (steps === 64 && map[r + dr]?.[c + dc]) nxtPos.add([r + dr, c + dc].join());
        else if (steps === 26501365 && map.at((r + dr) % map.length).at((c + dc) % map.length)) nxtPos.add([(r + dr), (c + dc)].join());
      }
    }
    pos = nxtPos;
    if (steps === 26501365 && (i + 1) % map.length === steps % map.length) {
      if (cts.length >= 3 && pos.size - 2 * cts.at(-1) + cts.at(-2) === cts.at(-1) - 2 * cts.at(-2) + cts.at(-3)) break;
      cts.push(pos.size);
    }
  }
  if (steps === 64) return pos.size;
  else {
    for (let i = cts.length * map.length + (steps % map.length); i <= steps; i += map.length) cts.push((cts.at(-1) - 2 * cts.at(-2) + cts.at(-3)) + 2 * cts.at(-1) - cts.at(-2));
    return cts.at(-1);
  }
}