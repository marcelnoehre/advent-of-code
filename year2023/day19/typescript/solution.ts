import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
let [rul, acc] = [{}, []]; setup();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
    return input.map(l => eval('(' + l.replaceAll('=', ':') + ')')).map(i => evaluate('in', i)).reduce((x, y) => x + y, 0);
}

export function part_2(): number {
  check("in", {x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000]});
  return acc.map(({x, m, a, s}) => (x[1] - x[0] + 1) * (m[1] - m[0] + 1) * (a[1] - a[0] + 1) * (s[1] - s[0] + 1)).reduce((x, y) => x + y, 0);
}

function evaluate(rule, input) {
  if (rule === 'A') return [input.x, input.m, input.a, input.s].reduce((x, y) => x + y, 0);
  if (rule === 'R') return 0;
  for (let {v, c, n, r} of rul[rule].ch) if (c === '<' && input[v] < n || c === '>' && input[v] > n) return evaluate(r, input);
  return evaluate(rul[rule].eo, input);
}

function check(rule, range) {
    if (rule === 'R') return;
    if (rule === 'A') return acc.push(range);
    for (let {v, c, n, r} of rul[rule].ch) {
        if (c === '<') {
            if (range[v][1] < n) return check(r, range);
            if (range[v][0] >= n) continue;
            check(r, {...range, [v]: [range[v][0], n - 1]});
            range[v] = [n, range[v][1]];
        } else {
            if (range[v][0] > n) return check(r, range);
            if (range[v][1] <= n) continue;
            check(r, {...range, [v]: [n + 1, range[v][1]]});
            range[v] = [range[v][0], n];
        }
    }
    check(rul[rule].eo, range);
}

function setup() {
    for (let rule; (rule = input.shift());) {
        const [name, ...ops] = rule.split(/[{,:}]/).filter(x => x), eo = ops.pop(), ch = [];
        for (let i = 0; i < ops.length; i += 2) ch.push({v: ops[i][0], c: ops[i][1], n: Number([...ops[i]].slice(2).join('')), r: ops[i + 1]});
        rul[name] = {ch, eo};
    }
}