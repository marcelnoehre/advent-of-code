import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: [number, number][] = file.toString().split('\n').map(line => line.split(',').map(Number) as [number, number]);
if (process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
  const [g, q, v]: [number[][], [[number, number], number][], Set<string>] = [Array.from({ length: 71 }, () => Array(71).fill(0)).map((row, y) => row.map((_, x) => input.slice(0, 1024).some(([ix, iy]) => ix === x && iy === y) ? 1 : 0)), [[[0,0], 0]], new Set('0,0')];
    while (q.length > 0) {
      const [[x, y], s] = q.shift()!;
      if (x === 70 && y === 70) return s;
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) if (((x + dx) >= 0 && (x + dx) < g.length && (y + dy) >= 0 && (y + dy) < g[0].length && g[(x + dx)][(y + dy)] === 0) && !v.has([(x + dx), (y + dy)].toString())) { v.add([(x + dx), (y + dy)].toString()); q.push([[(x + dx), (y + dy)], s + 1]); }
    }
}

export function part_2(): string {
  const ff = (g: boolean[][], lg: number[][], x: number, y: number, l: number): void => {
    const q: [number, number][] = [[x, y]];
    while (q.length > 0) {
      const [cx, cy] = q.shift()!;
      if (lg[cx][cy] !== 0) continue;
      lg[cx][cy] = l;
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) if ((cx + dx) >= 0 && (cx + dx) < g.length && (cy + dy) >= 0 && (cy + dy) < g[0].length && g[(cx + dx)][(cy + dy)] && lg[(cx + dx)][(cy + dy)] === 0) q.push([(cx + dx), (cy + dy)]);
    }
  }
  const lcc = (g: boolean[][]): number[][] => {
    let [lg, l] = [Array.from({ length: g.length }, () => Array(g[0].length).fill(0)), 1];
    for (let i = 0; i < g.length; i++) for (let j = 0; j < g[0].length; j++) if (g[i][j] && lg[i][j] === 0) ff(g, lg, i, j, l++);
    return lg;
  }
  const grid = Array.from({ length: 71 }, () => Array(71).fill(0));
  for (let i = 0; i < input.length; i++) {
      grid[input[i][1]][input[i][0]] = 1;
      const [l, n] = [lcc(grid.map(row => row.map(cell => cell === 0))), lcc(grid.map(row => row.map(cell => cell === 0))).flat().filter(val => val === 1).length];
      if (n === 1) continue;
      if (l[0][0] !== l[71 - 1][71 - 1]) return [input[i][0], input[i][1]].join(',');
  }
}
