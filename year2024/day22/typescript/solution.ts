import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().split('\n').map(n => Number(n))
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, secret) => { return acc + Array.from({ length: 2000 }).reduce<number>((s) => ((s = (s ^ (s << 6)) & 16777215), (s = (s ^ (s >> 5)) & 16777215), (s = (s ^ (s << 11)) & 16777215)), secret)}, 0);
}

export function part_2(): number {
  let [s, ms] = [{}, [0, '']];
  for (let sc of input) {
    let [pp, sbs, si] = [sc % 10, new Set<string>(), [sc % 10]];
    for (let i = 0; i < 2000; i++) {
      sc = (sc ^ (sc << 6)) & 16777215, sc = (sc ^ (sc >> 5)) & 16777215, sc = (sc ^ (sc << 11)) & 16777215;
      const [cp, pd] = [sc % 10, sc % 10 - pp];
      pp = cp;
      si.push(pd);
      if (i >= 3) {
        si.shift();
        s[si.join(',')] = (s[si.join(',')] || 0) + (sbs.has(si.join(',')) ? 0 : cp);
        if (ms[0] < s[si.join(',')]) ms = [s[si.join(',')], si.join(',')];
        sbs.add(si.join(','));
      }
    }
  }
  return Number(ms[0]);
}