import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split("\n");
let [o, c, s1, s2, p1, p2] = ["([{<", ")]}>", [], [], {")":3,"]":57,"}":1197,">":25137}, {")":1,"]":2,"}":3,">":4}];

if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, row) => {
    for (const char of row) {
      if (o.includes(char)) s1.unshift(c[o.indexOf(char)]);
      else if (s1.shift() !== char) return acc + p1[char];
    }
    return acc;
  }, 0);
}

export function part_2(): number {
  const res = input.reduce((acc, row) => {
    s2 = []; 
    if ([...row].every(char => o.includes(char) ? s2.unshift(c[o.indexOf(char)]) : s2.shift() === char)) if (s2.reduce((i, char) => i * 5 + p2[char], 0) > 0) acc.push(s2.reduce((i, char) => i * 5 + p2[char], 0));
    return acc;
  }, []).sort((a, b) => a - b);
  return res[Math.floor(res.length / 2)];
}
