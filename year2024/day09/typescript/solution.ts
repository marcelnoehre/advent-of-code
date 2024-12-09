import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().split('').map(Number);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const dm = input.flatMap((f, i) => Array(f).fill(i % 2 === 0 ? i / 2 : -1));
  for (let l = 0, r = dm.length - 1; l < r;) {
    while (l < r && dm[l] !== -1) l++;
    while (l < r && dm[r] === -1) r--;
    if (l < r) [dm[l], dm[r]] = [dm[r], -1];
  }
  return dm.reduce((acc, x, i) => acc + (x === -1 ? 0 : i * x), 0);
}

export function part_2(): number {
  const s = input.flatMap((f, i) => Array(f).fill(i % 2 === 0 ? i / 2 : -1)).reduce<{ v: number, st: number, sz: number }[]>((acc, x, i) => {
    if (x !== (acc.at(-1)?.v ?? null)) acc.push({ v: x, st: i, sz: 0 });
    acc.at(-1)!.sz++;
    return acc;
  }, []);
  const h = s.filter(x => x.v === -1).map(({ st, sz }) => [st, sz]);
  return s.filter(x => x.v !== -1).sort((a, b) => b.v - a.v).reduce((acc, { v, st, sz }) => {
    for (let i = 0; i < h.length; i++) {
      const [hf, hz] = h[i];
      if (hf < st && hz >= sz) {
        if (hz > sz) h[i] = [hf + sz, hz - sz];
        else h.splice(i, 1);
        return acc + Array.from({ length: sz }, (_, j) => (hf + j) * v).reduce((a, b) => a + b, 0);
      }
    }
    return acc + Array.from({ length: sz }, (_, j) => (st + j) * v).reduce((a, b) => a + b, 0);
  }, 0);
}
