import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
const [glx, er, ec] = [[], new Set(Array.from({length: input.length}, (_, i) => i)), new Set(Array.from({length: input[0].length}, (_, i) => i))];
for (let y = 0; y < input.length; y++) for (let x = 0; x < input[0].length; x++) if (input[y][x] === "#") glx.push({x, y}), ec.delete(x), er.delete(y);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return glx.reduce((sum, { x: xi, y: yi }, i) => sum + glx.slice(i + 1).reduce((acc, { x: xj, y: yj }) => acc + ((Math.max(xi, xj) - Math.min(xi, xj)) + (2 - 1) * new Set([...ec].filter(x => x < Math.max(xi, xj) && x > Math.min(xi, xj))).size) + ((Math.max(yi, yj) - Math.min(yi, yj)) + (2 - 1) * new Set([...er].filter(y => y < Math.max(yi, yj) && y > Math.min(yi, yj))).size), 0), 0);
}

export function part_2(): number {
  return glx.reduce((sum, { x: xi, y: yi }, i) => sum + glx.slice(i + 1).reduce((acc, { x: xj, y: yj }) => acc + ((Math.max(xi, xj) - Math.min(xi, xj)) + (1000000 - 1) * new Set([...ec].filter(x => x < Math.max(xi, xj) && x > Math.min(xi, xj))).size) + ((Math.max(yi, yj) - Math.min(yi, yj)) + (1000000 - 1) * new Set([...er].filter(y => y < Math.max(yi, yj) && y > Math.min(yi, yj))).size), 0), 0);
}