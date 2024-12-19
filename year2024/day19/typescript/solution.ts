import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input = file.toString().split("\n").map((line, i) => i === 0 ? line.trim().split(", ") : line.trim());
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const calc = (d: string, p: string[], m: { [key: string]: boolean | number }): boolean => {
    if (d in m) return m[d] as boolean;
    if (!d) return true;
    for (const pa of p) if (d.startsWith(pa)) if (calc(d.slice(pa.length), p, m)) {m[d] = true; return true;}
    return m[d] = false;
  }
  return input.slice(2).reduce((acc, e) => acc + (calc(e, input[0], {}) ? 1 : 0), 0);
}

export function part_2(): number {
  const calc = (d: string, p: string[], m: { [key: string]: boolean | number }): number => {
    if (d in m) return m[d] as number;
    if (!d) return 1;
    return m[d] = p.reduce((acc, pa) => acc + (d.startsWith(pa) ? calc(d.slice(pa.length), p, m) : 0), 0);
  }
  return input.slice(2).reduce((s, e) => s + (calc(e, input[0], {})), 0);
}