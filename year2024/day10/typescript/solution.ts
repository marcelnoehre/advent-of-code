import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split('\n').map(row => [...row]);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const fs = (c: string, x: number, y: number, cs: Set<string>): void => {
    if (c === "9") { cs.add(`${x},${y}`); return; }
    if (x > 0 && String(Number(input[x][y]) + 1) === input[x - 1][y]) fs(input[x - 1][y], x - 1, y, cs);
    if (y < input[0].length - 1 && String(Number(input[x][y]) + 1) === input[x][y + 1]) fs(input[x][y + 1], x, y + 1, cs);
    if (x < input.length - 1 && String(Number(input[x][y]) + 1) === input[x + 1][y]) fs(input[x + 1][y], x + 1, y, cs);
    if (y > 0 && String(Number(input[x][y]) + 1) === input[x][y - 1]) fs(input[x][y - 1], x, y - 1, cs);
  }
  return input.reduce((res, r, i) => res + r.reduce((acc, c, j) => {
    if (c === "0") {
      const nineCoords = new Set<string>();
      fs("0", i, j, nineCoords);
      return acc + nineCoords.size;
    }
    return acc;
  }, 0), 0);
}

export function part_2(): number {
  const fs = (c: string, x: number, y: number): number => {
    if (c === "9") return 1;
    let sc = 0;
    if (x > 0 && String(Number(input[x][y]) + 1) === input[x - 1][y]) sc += fs(input[x - 1][y], x - 1, y);
    if (y < input[0].length - 1 && String(Number(input[x][y]) + 1) === input[x][y + 1]) sc += fs(input[x][y + 1], x, y + 1);
    if (x < input.length - 1 && String(Number(input[x][y]) + 1) === input[x + 1][y]) sc += fs(input[x + 1][y], x + 1, y);
    if (y > 0 && String(Number(input[x][y]) + 1) === input[x][y - 1]) sc += fs(input[x][y - 1], x, y - 1);
    return sc;
  }
  return input.reduce((res, r, i) => res + r.reduce((acc, c, j) => acc + (c === "0" ? fs("0", i, j) : 0), 0), 0);
}