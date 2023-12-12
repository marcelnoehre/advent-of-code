import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, row) => acc + arr(Array(1).fill(row.split(' ')[0]).join('?').split(''), Array(1).fill(row.split(' ')[1]).join(',').split(',').map(Number)), 0);
}

export function part_2(): number {
  return input.reduce((acc, row) => acc + arr(Array(5).fill(row.split(' ')[0]).join('?').split(''), Array(5).fill(row.split(' ')[1]).join(',').split(',').map(Number)), 0);
}

function arr(s, g, si = 0, gi = 0, m = {}) {
  const memo = (result) => (m[si] ??= {})[gi] = result;
  if (m[si]?.[gi] !== undefined) return m[si][gi];
  if (si >= s.length) return +(gi === g.length);
  if (gi >= g.length) return +(s.indexOf('#', si) === -1);
  if (s[si] === '.') return memo(arr(s, g, s.findIndex((s, i) => i >= si && s !== '.') === -1 ? s.length : s.findIndex((s, i) => i >= si && s !== '.'), gi, m));
  if (s[si] === '#') {
    if (s.length - si < g[gi] || s.slice(si, si + g[gi]).some((s) => s === '.') || s[si + g[gi]] === '#') return memo(0);
    return memo(arr(s, g, si + g[gi] + 1, gi + 1, m));
  }
  if (s[si] === '?') {
    if (s.length - si < g[gi] || s.slice(si, si + g[gi]).some((s) => s === '.') || s[si + g[gi]] === '#') return memo(arr(s, g, si + 1, gi, m));
    return memo(arr(s, g, si + 1, gi, m) + arr(s, g, si + g[gi] + 1, gi + 1, m));
  }
}