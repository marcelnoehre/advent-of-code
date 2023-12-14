import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [r, w, b] = [[], [], true]
  for (let y = 0; y < input.length; y++) for (let x = 0; x < input[0].length; x++) (input[y][x] === "O" ? r.push([`${x},${y}`, x, y]) : (input[y][x] === "#" ? w.push([`${x},${y}`, x, y]) : null));
  while (b) b = false, r.forEach(rock => { if (rock[2] > 0 && !w.some(w => w[0] === `${rock[1]},${rock[2] - 1}`) && !r.some(w => w[0] === `${rock[1]},${rock[2] - 1}`)) [b, rock[0], rock[2]] = [true, `${rock[1]},${rock[2] - 1}`, rock[2] - 1] });
  return r.map(r => input.length - r[2]).reduce((a, b) => a + b, 0);
}

export function part_2(): number {
  let [r, w, rl, wl, i, mi, my, mx, s] = [[], [], {}, {}, 0, 1000000000, input.length, input[0].length, []];
  for (let y = 0; y < input.length; y++) for (let x = 0; x < input[0].length; x++) {
    if (input[y][x] === "O") r.push([`${x},${y}`, x, y]);
    if (input[y][x] === "O") rl[`${x},${y}`] = [`${x},${y}`, x, y];
    if (input[y][x] === "#") w.push([`${x},${y}`, x, y]);
    if (input[y][x] === "#") wl[`${x},${y}`] = [`${x},${y}`, x, y];
  }
  
  while (i++ < mi) {
    let ts = [{ d: "N", y: -1, x: 0, c: (a,b) => a[2] - b[2] }, { d: 'W', y: 0, x: -1, c: (a, b) => a[1] - b[1] }, { d: 'S', y: +1, x: 0, c: (a, b) => b[2] - a[2] }, { d: 'E', y: 0, x: +1, c: (a, b) => b[1] - a[1] }];
    ts.forEach(t => {
      do {
        var bool = false;
        r.sort(t.c).forEach(rock => {
          if (rock[1] + t.x >= 0 && rock[2] + t.y >= 0 && rock[1] + t.x < mx && rock[2] + t.y < my && !wl[`${rock[1] + t.x},${rock[2] + t.y}`] && !rl[`${rock[1] + t.x},${rock[2] + t.y}`]) {            
            delete rl[rock[0]]
            bool = true, rl[`${rock[1] + t.x},${rock[2] + t.y}`] = rock, rock[0] = `${rock[1] + t.x},${rock[2] + t.y}`, rock[1] = rock[1] + t.x, rock[2] = rock[2] + t.y
          }
        })
      } while (bool)
    })
    const rockKeys = new Set(Object.keys(rl));
    if (i < mi - 1000 && s.find(state => [...state].every(r => rockKeys.has(r)))) i += (mi - i - 5);
    s.push(rockKeys);
  }
  return r.map(r => input.length - r[2]).reduce((a, b) => a + b, 0);
}