import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
const [c, m, g] = [{ '.' : 0, '#' : -1, '^' : 0 }, { 1: [-1, 0], 2: [0, 1], 4: [1, 0], 8: [0, -1] }, [input.findIndex((row) => row.includes("^")), input[input.findIndex((row) => row.includes("^"))].indexOf("^")]];
const [d, b] = [input.map((line) => line.split("").map((char) => c[char])), input.map((line) => line.split("").map((char) => c[char]))];
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number | false {
  return count(d, 1, [...g]);
}

export function part_2(): number | false {
  let res = -1;
  for (let i = 0; i < 130; i++) for (let j = 0; j < 130; j++) if (d[i][j] > 0) {
    const t = b.map(row => [...row]);
    t[i][j] = -1;
    if (!count(t, 1, [...g])) res++;
  }
  return res;
}

function count(grid: number[][], dir: number, pos: number[]): number | false {
  while (true) {
    const [x, y] = [pos[0] + m[dir][0], pos[1] + m[dir][1]];
    if (x < 0 || x >= input.length || y < 0 || y >= input[0].length || grid[x]?.[y] === -1) {
      grid[pos[0]][pos[1]] += dir;
      if (grid[x]?.[y] === -1) dir = (dir * 2) % 16 || 1;
      else break;
    } else if (grid[pos[0]][pos[1]] & dir) return false;
    else grid[pos[0]][pos[1]] += dir, pos = [x, y];
  }
  return grid.flat().reduce((acc, cell) => acc + (cell > 0 ? 1 : 0), 0);
}
