import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split(/\r/).join("").split("\n").map(x => x.split(""));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((r, row, i) => r + row.reduce((s, c, j) => s + ((i == 0 || c < input[i-1][j]) && (i == input.length-1 || c < input[i+1][j]) && (j == 0 || c < row[j-1]) && (j == row.length-1 || c < row[j+1]) ? +c + 1 : 0), 0), 0);
}

export function part_2(): number {
  let [p, v, bs] = ['0|0', [], []];
  while(p != '') {
    p = '';
    for(let i = 0; i < input.length; i++) for(let j = 0; j < input[0].length; j++) if(+input[i][j] != 9 && !v.includes(`${j}|${i}`)) p = `${j}|${i}`;
    if(p == '') break;
    v.push(...basin(p, input));
    bs.push(basin(p, input).length);
  };
  return bs.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1);
}

function basin(p, l) {
  const [basin, q, visited] = [[], [p], { [p]: true }];
  while (q.length) {
    const [x, y] = q.shift().split('|').map(Number);
    if (+l[y][x] == 9) continue;
    basin.push(`${x}|${y}`);
    [[x+1, y], [x-1, y], [x, y+1], [x, y-1]].forEach(([nx, ny]) => { if (nx >= 0 && ny >= 0 && nx < l[0].length && ny < l.length && !visited[`${nx}|${ny}`] && +l[ny][nx] != 9) {
        q.push(`${nx}|${ny}`);
        visited[`${nx}|${ny}`] = true;
    }});
  }
  return basin;
}
