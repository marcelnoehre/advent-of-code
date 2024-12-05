import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().trim().split('\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((count, row, r) => count + row.split('').reduce((innerCount, _, c) => innerCount + [[1, 1], [1, -1], [0, 1], [1, 0], [-1, -1], [-1, 1], [-1, 0], [0, -1]].reduce((acc, [dr, dc]) => acc + ([...Array(4)].every((_, i) => input[r + dr * i]?.[c + dc * i] === "XMAS"[i]) ? 1 : 0), 0), 0), 0);
}

export function part_2(): number {
  let [w, h, cw, res] = [input[0].length, input.length, word => word === 'SAM' || word === 'MAS', 0];
  for(let i = 1; i < w - 1; i++) for(let j = 1; j < h - 1; j++) {
    if(cw(`${input[i - 1][j - 1]}${input[i][j]}${input[i + 1][j + 1]}`) && cw(`${input[i + 1][j - 1]}${input[i][j]}${input[i - 1][j + 1]}`)) res++;
  }
  return res;
}