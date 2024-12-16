import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().split("\n\n").map((c) => c.match(/\d+/g).map(Number));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, chunk) => {
    let t = null;
    for (let a = 0; a <= 100; a++) for (let b = 0; b <= 100; b++) if (a * chunk[0] + b * chunk[2] === chunk[4] && a * chunk[1] + b * chunk[3] === chunk[5]) t = t === null ? (3 * a + b) : Math.min(t, (3 * a + b));
    return acc + (t ?? 0);
  }, 0);
}

export function part_2(): number {
  const calc = ([ax, ay, bx, by, px, py]: number[]) => ((px * by - bx * py) % (ax * by - bx * ay) !== 0 || (ax * py - px * ay) % (ax * by - bx * ay) !== 0) ? 0 : 3 * ((px * by - bx * py) / (ax * by - bx * ay)) + (ax * py - px * ay) / (ax * by - bx * ay);
  return input.reduce((acc, c) => {
    c[4] += 10 ** 13; c[5] += 10 ** 13;
    return acc + calc(c);
  }, 0);
}
