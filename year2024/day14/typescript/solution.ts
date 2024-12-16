import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().split("\n").map((row) => row.match(/[-+]?\d+/g).map(Number));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const [wir, cs] = [([x, y]: number[]) => {
    let res = 0b00;
    if (y == (103 - 1) / 2 || x == (101 - 1) / 2) return -1;
    if (y < (103 - 1) / 2) res |= 0b01;
    if (x < (101 - 1) / 2) res |= 0b10;
    return res;
  }, [0, 0, 0, 0]];
  for (let i = 0; i < input.length; i++) if (wir(ns(input[i], 100)) !== -1) cs[wir(ns(input[i], 100))]++;
  return cs.reduce((acc, curr) => acc * curr, 1);
}

export function part_2(): number {
  const [rs, s] = [(g, dp = 0, tp = 0) => {
    for (let r = 0; r < 103; r++) for (let c = 0; c < 101; c++) {
      if (c + 1 < 101) { tp++; if (g[r][c] !== g[r][c + 1]) dp++; }
      if (r + 1 < 103) { tp++; if (g[r][c] !== g[r + 1][c]) dp++; }
    }
    return tp === 0 ? 0 : dp / tp;
  }, []];
  for (let j = 0; j < 10 ** 4; j++) {
    const g = Array.from({ length: 103 }, () => Array(101).fill(false));
    for (let i = 0; i < input.length; i++) g[ns(input[i], j)[0]][ns(input[i], j)[1]] = true;
    s.push([j, rs(g)]);
  }
  s.sort((a, b) => a[1] - b[1]);
  return s[0][0];
}

function ns([x, y, xv, yv]: number[], s) {
  const w = (a, b) => ((a % b) + b) % b;
  return [w(x + s * xv, 101), w(y + s * yv, 103)];
}
