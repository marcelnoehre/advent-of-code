import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n').filter(Boolean);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [dir, pts, b] = [{ U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] }, [[0, 0]], 0];
  input.forEach((row) => {
    b += Number(row.split(' ')[1]);
    pts.push([pts[pts.length - 1][0] + dir[row.split(' ')[0]][0] * Number(row.split(' ')[1]), pts[pts.length - 1][1] + dir[row.split(' ')[0]][1] * Number(row.split(' ')[1])]);
  });
  return Math.floor(Math.abs(pts.reduce((acc, [x1, y1], i) => { return acc + (x1 * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * y1) }, 0)) / 2 + b / 2 + 1);
}

export function part_2(): number {
  let [dir, pts, b] = [[[0, 1],[1, 0],[0, -1],[-1, 0]], [[0, 0]], 0];
  input.forEach((row) => {
    b += parseInt((row.split(' ').pop() || '').slice(2, -1).slice(0, -1), 16);
    pts.push([pts[pts.length - 1][0] + dir[parseInt((row.split(' ').pop() || '').slice(2, -1).slice(-1), 16)][0] * parseInt((row.split(' ').pop() || '').slice(2, -1).slice(0, -1), 16), pts[pts.length - 1][1] + dir[parseInt((row.split(' ').pop() || '').slice(2, -1).slice(-1), 16)][1] * parseInt((row.split(' ').pop() || '').slice(2, -1).slice(0, -1), 16)]);
  });
  return Math.floor(Math.abs(pts.reduce((acc, [x1, y1], i) => { return acc + (x1 * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * y1) }, 0)) / 2 + b / 2 + 1);
}
