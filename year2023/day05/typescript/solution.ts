import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n\n');
const categories: number[][][] = input.slice(1).map(block => block.split('\n').slice(1).map(row => row.split(' ').map(Number)));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [seeds, tmp, map] = [input[0].split(': ')[1].split(' ').map(Number), [], false];
  for(let c of categories) {
    for(let s of seeds) {
      for(let [x,y,z] of c) {
        if(y <= s && s < y + z) {
          map = true, tmp.push(s - y + x);
          break;
        }
      }
      map || tmp.push(s), map = false;
    }
    [seeds, tmp] = [tmp, []];
  }
  return Math.min(...seeds);
}

export function part_2(): number {
  let [seeds, tmp, map] = [input[0].split(': ')[1].split(' ').map(Number).reduce((acc, curr, i, arr) => (i % 2 === 0 ? acc.push([curr, curr + arr[i + 1]]) : null, acc), []), [], false];
  for (let c of categories) {
    while (seeds.length > 0) {
      let [start, end] = seeds.pop();
      for (let [x,y,z] of c) {
        if (Math.max(start, y) < Math.min(end, y + z)) {
          map = true, tmp.push([Math.max(start, y) - y + x, Math.min(end, y + z) - y + x]);
          if(Math.max(start, y) > start) seeds.push([start, Math.max(start, y)]);
          if(end > Math.min(end, y + z)) seeds.push([Math.min(end, y + z), end]);
          break;
        }
      }
      map || tmp.push([start, end]), map = false;
    }
    [seeds, tmp] = [tmp, []];
  }
  return seeds.reduce((a,b) => { return b[1] < a[1] ? b : a }, seeds[0])[0];
}