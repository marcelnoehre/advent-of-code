import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string = file.toString();
const rgx = [/mul\((\d+),(\d+)\)/g, /do\(\)|don't\(\)/g];
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return [...input.matchAll(rgx[0])].reduce((sum, [, x, y]) => sum + Number(x) * Number(y), 0);
}

export function part_2(): number {
  let [sum, isEnabled, i] = [0, true, 0];
  while (i < input.length) {
    const [c, m] = [rgx[1].exec(input), rgx[0].exec(input)];
    if (c && (!m || c.index < m.index)) isEnabled = c[0] === "do()", i = c.index + c[0].length;
    else if (m) isEnabled && (sum += parseInt(m[1]) * parseInt(m[2])), i = m.index + m[0].length;
    else break;
    rgx[1].lastIndex = rgx[0].lastIndex = i;
  }
  return sum;
}
