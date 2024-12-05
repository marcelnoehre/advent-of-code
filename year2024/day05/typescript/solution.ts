import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
const [r, u] = [input.slice(0, input.indexOf('')).map(line => line.split('|').map(Number) as [number, number]), input.slice(input.indexOf('') + 1).map(line => line.split(',').map(Number))];
const isUpdateValid = (update: number[], rules: [number, number][]): boolean => !update.some((_, i) => update.slice(i + 1).some((e, j) => rules.some(([a, b]) => a === e && b === update[i])));
const findMiddlePage = (update: number[]): number => update[Math.floor(update.length / 2)];
const reorderUpdate = (update: number[], rules: [number, number][]) => orderRules(rules.filter(([a, b]) => update.includes(a) && update.includes(b)));
const orderRules = (rules: [number, number][]): number[] => {
  const [g, c, n] = [{}, {}, new Set<number>()];
  rules.forEach(([a, b]) => {
    g[a] = (g[a] || []).concat(b);
    c[b] = (c[b] || 0) + 1;
    n.add(a).add(b);
  });
  const [q, r] = [[...n].filter(n => !c[n]), []];
  while (q.length) {
    r.push(q.shift()!);
    (g[r[r.length - 1]] || []).forEach(n => { if (--c[n] === 0) q.push(n) });
  }
  return r;
};
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return u.reduce((out, update) => isUpdateValid(update, r) ? out + findMiddlePage(update) : out, 0);
}

export function part_2(): number {
  return u.reduce((out, update) => isUpdateValid(update, r) ? out : out + findMiddlePage(reorderUpdate(update, r)), 0);
}
