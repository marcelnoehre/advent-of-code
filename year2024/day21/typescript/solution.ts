import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split(/\r?\n/);
const is = (k, x, y) => { return (x >= 0 && x < k.length && y >= 0 && y < k[0].length && k[x][y] !== " ") };
const gp = (k, c) => { for (let i = 0; i < k.length; i++) for (let j = 0; j < k[i].length; j++) if (k[i][j] === c) return [i, j] };
const pe = (a) => { return a.length === 0 ? [[]] : a.flatMap((v, i) => pe([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [v, ...p])) };
const cc = (c, m, s) => { return [sep(c, 1, m, [['7','8','9'],['4','5','6'],['1','2','3'],[' ','0','A']], s, {"^":[-1,0],"v":[1,0],"<":[0,-1],">":[0,1]}, is), Number(c.replace(/\D/g, ""))]};
if (process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1() {
  return input.reduce((total, code) => total + cc(code, 3, 'A')[0] * cc(code, 3, 'A')[1], 0);
}

export function part_2() {
  return input.reduce((total, code) => total + cc(code, 26, 'A')[0] * cc(code, 26, 'A')[1], 0);
}

function ap(k, s, e, d, isf) {
  if (s === e) return new Set(["A"]);
  let [p, co] = ["" + ((gp(k, s)[0] - gp(k, e)[0]) < 0 ? "v".repeat(Math.abs((gp(k, s)[0] - gp(k, e)[0]))) : "^".repeat(Math.abs((gp(k, s)[0] - gp(k, e)[0])))) + ((gp(k, s)[1] - gp(k, e)[1]) < 0 ? ">".repeat(Math.abs((gp(k, s)[1] - gp(k, e)[1]))) : "<".repeat(Math.abs((gp(k, s)[1] - gp(k, e)[1])))), new Set()];
  for (const i of pe([...p])) {
    let [v, cx, cy] = [true, gp(k, s)[0], gp(k, s)[1]];
    for (const step of i) {
      [cx, cy] = [cx + d[step][0], cy + d[step][1]];
      if (!isf(k, cx, cy)) { v = false; break; }
    }
    if (v) co.add(i.join('') + "A");
  }
  return co;
}

function sep(c, d, md, k, s, dir, isf) {
  let [sc, res] = [s, 0];
  for (const char of c) {
    if (d === md) res += Math.min(...Array.from(ap(d === 1 ? [['7','8','9'],['4','5','6'],['1','2','3'],[' ','0','A']] : [[' ','^','A'],['<','v','>']], sc, char, dir, isf)).map((p: string) => p.length));
    else {
      const l = new Set();
      for (const po of ap(d === 1 ? [['7','8','9'],['4','5','6'],['1','2','3'],[' ','0','A']] : [[' ','^','A'],['<','v','>']], sc, char, dir, isf)) l.add(sep(po, d + 1, md, k, s, dir, isf));
      res += Math.min(...Array.from(l) as number[]);
    }
    sc = char;
  }
  return res;
}