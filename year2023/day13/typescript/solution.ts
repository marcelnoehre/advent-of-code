import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][][] = file.toString().split('\n\n').map(pattern => pattern.split('\n').map(row => row.split('')));
const err = (a, b) => a.reduce((count, _, i) => count + +(a[i] !== b[i]), 0);
const rot = map => map[0].map((_, j) => map.map((_, i) => map[i][j]));

if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, pattern) => acc + (ref(pattern, 0) * 100 + ref(rot(pattern), 0)), 0);
}

export function part_2(): number {
  return input.reduce((sum, pattern) => sum + (ref(pattern, 1) * 100 + ref(rot(pattern), 1)), 0);
}

function ref(map, max) {
  for (let i = 0; i < map.length - 1; i++) {
    let n = err(map[i], map[i + 1]);
    if (n <= max) {
      for (let j = i - 1; j >= 0 && map[j] && map[i + 1 + (i - j)]; j--) {
        n += err(map[j], map[i + 1 + (i - j)]);
        if (n > max) continue;
      }
      if (n === max) return i + 1;
    }
  }
  return 0;
}