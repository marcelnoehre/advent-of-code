import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
const result = solve();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return result[0];
}

export function part_2(): number {
  return result[1];
}

function fall(brk, map) {
  let [fBrk, isF] = [new Set(), true];
  while (isF) {
    isF = false;
    outer: for (let i = 0; i < brk.length; i++) {
      const [[x1, y1, z1], [x2, y2, z2]] = brk[i];
      for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) for (let z = z1; z <= z2; z++) if (map[z - 1][y][x] && (map[z - 1][y][x] !== i + 1)) continue outer;
      [isF, brk[i]] = [true, [[x1, y1, z1 - 1],[x2, y2, z2 - 1]]];
      fBrk.add(i);
      for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) for (let z = z1; z <= z2; z++) [map[z][y][x], map[z - 1][y][x]]  = [0, i + 1];
    }
  }
  return fBrk.size;
}

function solve() {
  let [brk, mx, my, mz] = [[],0,0,0];
  for (const row of input) {
    const [[x1, y1, z1], [x2, y2, z2]] = row.split('~').map((coord) => coord.split(',').map(Number));
    [mx, my, mz] = [Math.max(mx, x2), Math.max(my, y2), Math.max(mz, z2)];
    brk.push([[x1, y1, z1],[x2, y2, z2]]);
  }
  const map = [...Array(mz + 1)].map((_, z) => [...Array(my + 1)].map(() => Array(mx + 1).fill(+!!z - 1)));
  for (let i = 0; i < brk.length; i++) {
    const [[x1, y1, z1], [x2, y2, z2]] = brk[i];
    for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) for (let z = z1; z <= z2; z++) map[z][y][x] = i + 1;
  }
  fall(brk, map);
  let [p1, p2] = [brk.length, 0];
  for (let i = 0; i < brk.length; i++) {
    const [bricks2, [[x1, y1, z1], [x2, y2, z2]], map2] = [[...brk], [...brk][i], structuredClone(map)];
    for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) for (let z = z1; z <= z2; z++) map2[z][y][x] = 0;
    let f; p1 -= +!!(f = fall(bricks2, map2)), p2 += f;
  }
  return [p1, p2];
}