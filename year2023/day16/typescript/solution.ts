import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split('\n').map(row => row.split(''));
const count = (ly, li, seen = new Map()) => li.length > 0 ? count(ly, li.flatMap(l => light(ly, l, seen)), seen) : seen.size;
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return count(input, [[0, 0, 1, 0]]);
}

export function part_2(): number {
  let sum = 0;
  for (let y = 0; y < input.length; y++) sum = Math.max(sum, count(input, [[0, y, 1, 0]]), count(input, [[input[0].length - 1, y, -1, 0]]));
  for (let x = 0; x < input[0].length; x++) sum = Math.max(sum, count(input, [[x, 0, 0, 1]]), count(input, [[x, input.length - 1, 0, -1]]));
  return sum;
}

function light(l, [x, y, dx, dy], seen) {
  if (x < 0 || y < 0 || x >= l[0].length || y >= l.length) return [];
  if (!seen.has(`${x},${y}`)) seen.set(`${x},${y}`, new Set());
  if (seen.get(`${x},${y}`).has(`${dx},${dy}`)) return [];
  seen.get(`${x},${y}`).add(`${dx},${dy}`);
  if (l[y][x] === '/') return [[-dy, -dx]].map(([dx, dy]) => ([x + dx, y + dy, dx, dy]));
  if (l[y][x] === '\\') return [[dy, dx]].map(([dx, dy]) => ([x + dx, y + dy, dx, dy]));
  if (l[y][x] === '|' && dx !==0) return [[dy, -1], [dy, 1]].map(([dx, dy]) => ([x + dx, y + dy, dx, dy]));
  if (l[y][x] === '-' && dy !==0) return [[-1, dx], [1, dx]].map(([dx, dy]) => ([x + dx, y + dy, dx, dy]));
  return [[dx, dy]].map(([dx, dy]) => ([x + dx, y + dy, dx, dy]));
}