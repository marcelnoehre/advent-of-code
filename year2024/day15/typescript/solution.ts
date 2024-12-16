import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n\n');
const dir: { [key: string]: [number, number] } = {'<':[0,-1],'>':[0,1],'^':[-1,0],'v':[1,0]};
if (process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [m, g, x, y] = [input[1].replace('\n', ''), input[0].split('\n').map(row => row.split('')), 0, 0];
  for (let i = 1; i < g.length - 1; i++) for (let j = 1; j < g[0].length - 1; j++) if (g[i][j] === '@') { [x, y] = [i, j]; break };
  for (const mv of m) if (dir[mv]) {
    let [[dx, dy], nx, ny] = [dir[mv], x + dir[mv][0], y + dir[mv][1]];
    while (g[nx][ny] !== '#') {
      if (g[nx][ny] === '.') {
        while (nx !== x || ny !== y) [g[nx][ny], g[nx - dx][ny - dy], nx, ny] = [g[nx - dx][ny - dy], g[nx][ny], nx - dx, ny - dy];
        [x, y] = [x + dx, y + dy]; break;
      }
      [nx, ny] = [nx + dx, ny + dy];
    }
  }
  return g.slice(1, g.length - 1).reduce((res, r, i) => { return res + r.slice(1, g[0].length - 1).reduce((acc, c, j) => { return c === 'O' ? acc + 100 * (i + 1) + (j + 1) : acc; }, 0)}, 0);
}

export function part_2(): number {
  let [m, g, x, y] = [input[1].replace('\n', ''), input[0].replace(/#/g, '##').replace(/\./g, '..').replace(/O/g, '[]').replace(/@/g, '@.').split('\n').map(row => row.split('')), 0, 0];
  for (let i = 1; i < g.length - 1; i++) for (let j = 1; j < g[0].length - 1; j++) if (g[i][j] === '@') { [x, y] = [i, j]; break; }
  for (const mv of m) if (dir[mv]) {
    let [[dx, dy], tm, f] = [dir[mv], [[x, y]], true];
    for (let [i, j] of tm) {
      let [nx, ny] = [i + dx, j + dy];
      if (!tm.some(([xi, yi]) => xi === nx && yi === ny)) {
        if (g[nx][ny] === '#') { f = false; break; }
        if (g[nx][ny] === '[') tm.push([nx, ny], [nx, ny + 1]);
        if (g[nx][ny] === ']') tm.push([nx, ny], [nx, ny - 1]);
      }
    }
    if (f) {
      for (let [i, j] of tm.reverse()) [g[i + dx][j + dy], g[i][j]] = [g[i][j], g[i + dx][j + dy]];
      x += dx; y += dy;
    }
  }
  return g.slice(1, g.length - 1).reduce((res, r, i) => res + r.slice(1, g[0].length - 1).reduce((acc, c, j) => acc + (c === '[' ? 100 * (i + 1) + (j + 1) : 0), 0), 0);
}
