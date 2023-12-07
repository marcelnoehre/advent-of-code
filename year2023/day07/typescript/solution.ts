import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: [string, number][] = file.toString().split('\n').map(row => row = [row.split(/\s+/)[0], Number(row.split(/\s+/)[1])]);
const map: { [key: string]: string }[] = [{T:'A',J:'B',Q:'C',K:'D',A:'E'},{T:'A',J:'.',Q:'C',K:'D',A:'E'}];

if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const str = (h: string): [number, string[]] => [cls(h), h.split('').map(crd => (map[0][crd] || crd) as string)];
  const cls = (h: string): number => h.split('').map(crd => h.split(crd).length - 1).includes(5) ? 6 : h.split('').map(crd => h.split(crd).length - 1).includes(4) ? 5 : h.split('').map(crd => h.split(crd).length - 1).includes(3) && h.split('').map(crd => h.split(crd).length - 1).includes(2) ? 4 : h.split('').map(crd => h.split(crd).length - 1).includes(3) ? 3 : h.split('').map(crd => h.split(crd).length - 1).filter(c => c === 2).length === 4 ? 2 : h.split('').map(crd => h.split(crd).length - 1).includes(2) ? 1 : 0;
  input.sort((p1, p2) => str(p1[0])[0] !== str(p2[0])[0] ? str(p1[0])[0] - str(p2[0])[0] : Array.from({ length: str(p1[0])[1].length }, (_, i) => str(p1[0])[1][i] !== str(p2[0])[1][i] ? str(p1[0])[1][i].localeCompare(str(p2[0])[1][i]) : 0).find(val => val !== 0) || 0);
  return input.reduce((acc, [_, bid], rnk) => acc + (rnk + 1) * bid, 0);
}

export function part_2(): number {
  const score = (h: string): number => h.split('').map(crd => h.split('').filter(c => c === crd).length).includes(5) ? 6 : h.split('').map(crd => h.split('').filter(c => c === crd).length).includes(4) ? 5 : h.split('').map(crd => h.split('').filter(c => c === crd).length).includes(3) ? h.split('').map(crd => h.split('').filter(c => c === crd).length).includes(2) ? 4 : 3 : h.split('').map(crd => h.split('').filter(c => c === crd).length).filter(cnt => cnt === 2).length === 4 ? 2 : h.split('').map(crd => h.split('').filter(c => c === crd).length).includes(2) ? 1 : 0;
  const replace = (h: string, i: number): string[] => i === h.length ? [''] : [...new Set(replace(h, i + 1).flatMap(partial => [...(h[i] === 'J' ? '23456789TQKA' : h[i])].map(char => partial + char)))];
  const cls = (h: string): number => Math.max(...replace(h, 0).map(score));
  const str = (h: string): [number, string[]] => [cls(h), h.split('').map(card => map[1][card] || card)];
  input.sort((p1, p2) => str(p1[0])[0] !== str(p2[0])[0] ? str(p1[0])[0] - str(p2[0])[0] : Array.from({ length: str(p1[0])[1].length }, (_, i) => str(p1[0])[1][i] !== str(p2[0])[1][i] ? str(p1[0])[1][i].localeCompare(str(p2[0])[1][i]) : 0).find(val => val !== 0) || 0);
  return input.reduce((acc, [_, bid], i) => acc + (i + 1) * bid, 0);
}