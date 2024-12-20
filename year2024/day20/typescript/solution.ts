import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split('\n').map(row => row.split(''));
const valid = (g: string[][], r: number, c: number) => r >= 0 && r < g.length && c >= 0 && c < g[0].length;
const find = (g: string[][], t: string): [number, number] => { for (let r = 0; r < g.length; r++) for (let c = 0; c < g[0].length; c++) if (g[r][c] === t) return [r, c]; }
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return calc(input, dijkstra(input, find(input, 'S')), 2, 100);
}

export function part_2(): number {
  return calc(input, dijkstra(input, find(input, 'S')), 20, 100);
}

function dijkstra(g: string[][], s: [number, number]): number[][] {
  const m = Array.from({ length: g.length }, () => Array(g[0].length).fill(Infinity));
  m[s[0]][s[1]] = 0;
  const pq: [number, [number, number]][] = [[0, [s[0], s[1]]]];
  while (pq.length > 0) {
    const [sec, [x, y]] = pq.shift()!;
    if (sec > m[x][y]) continue;
    for (const [dx, dy] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) if (valid(g, x + dx, y + dy) && g[x + dx][y + dy] !== '#' && sec + 1 < m[x + dx][y + dy]) {
      m[x + dx][y + dy] = sec + 1;
      pq.push([sec + 1, [x + dx, y + dy]]);
    }
  }
  return m;
}

function calc(g: string[][], m: number[][], max: number, min: number): number {
  return g.reduce((res, row, x) => { return res + row.reduce((acc, cell, y) => {
    if (cell !== '#') {
      acc += [...Array(2 * max + 1).keys()].reduce((stepsAcc, i) => { return stepsAcc + [...Array(2 * max + 1).keys()].reduce((dyAcc, j) => {
        if ((i - max === 0 && j - max === 0) || Math.abs(i - max) + Math.abs(j - max) > max) return dyAcc;
        if ((valid(g, x + i - max, y + j - max) && m[x + i - max][y + j - max] !== Infinity) && (m[x + i - max][y + j - max] - m[x][y] - (Math.abs(i - max) + Math.abs(j - max)) >= min)) return dyAcc + 1;
        return dyAcc;
      }, 0); }, 0);
    }
    return acc;
  }, 0); }, 0);
}