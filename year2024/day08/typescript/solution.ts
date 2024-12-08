import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
const [create, add, sub, valid] = [(r, i) => ({ r, i }), (a, b) => create(a.r + b.r, a.i + b.i), (a, b) => create(a.r - b.r, a.i - b.i), (l) => l.r >= 0 && l.r < input[0].length && l.i >= 0 && l.i < input.length];
if (process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const [{ a }, ls ] = [parse(), new Set()];
  a.forEach((p) => {
    for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) {
      [add(p[j], sub(p[j], p[i])), sub(p[i], sub(p[j], p[i]))].forEach((l) => { if (valid(l)) ls.add(`${l.r},${l.i}`) });
    }
  });
  return ls.size;
};

export function part_2(): number {
  const [{ a, A }, ls] = [parse(), new Set()];
  a.forEach((p) => {
    for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) {
      let l = add(p[j], sub(p[j], p[i]));
      while (valid(l)) {
        ls.add(`${l.r},${l.i}`);
        l = add(l, sub(p[j], p[i]));
      }
      l = sub(p[i], sub(p[j], p[i]));
      while (valid(l)) {
        ls.add(`${l.r},${l.i}`);
        l = sub(l, sub(p[j], p[i]));
      }
    }
  });
  return new Set([...A, ...ls]).size;
};

function parse() {
  const [a, A] = [new Map(), new Set()];
  input.forEach((r, j) => r.split('').forEach((c, i) => {
    if (c !== '.') {
      const p = create(i, j);
      if (!a.has(c)) a.set(c, []);
      a.get(c).push(p);
      A.add(`${p.r},${p.i}`);
    }
  }));
  return { a, A };
};