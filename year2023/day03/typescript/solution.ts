import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split('\n').map(row => row.split(''));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return calc(1);
}

export function part_2(): number {
  return calc(2);
}

export default function calc(part: number): number {
  let [directions, ratios, sum] = [[[-1, 0],[-1, 1],[0, 1],[1, 1],[1, 0],[1, -1],[0, -1],[-1, -1]], new Map(), 0];
  for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
          if (!Number.isFinite(Number(input[i][j]))) continue;
          if (directions.map(([x, y]) => [x + i, y + j]).map(([x, y]) => input[x]?.[y]).some((x) => x && x !== "." && !Number.isFinite(Number(x)))) {
            const [neighbour, valid, range] = [directions.map(([x, y]) => [x + i, y + j]), directions.map(([x, y]) => [x + i, y + j]).map(([x, y]) => input[x]?.[y]).map((x) => x && x !== "." && !Number.isFinite(Number(x))), [((arr, i) => { while (i >= 0 && !isNaN(Number(arr[i]))) i--; return i; })(input[i], j), ((arr, i) => { while (i < arr.length && !isNaN(Number(arr[i]))) i++; return i; })(input[i], j)]];
            j = range[1] - 1;
            neighbour.forEach(([x, y], d) => { if (valid[d]) (ratios.has(`${x}-${y}`) ? ratios.get(`${x}-${y}`)! : ratios.set(`${x}-${y}`, []).get(`${x}-${y}`)!).push(Number(input[i].slice(range[0] + 1, range[1]).join("")))});
            sum += Number(input[i].slice(range[0] + 1, range[1]).join(""));
          }
      }
  }
  return part === 1 ? sum : Array.from(ratios.values()).reduce((sum, y) => (y.length === 2 ? sum + y[0] * y[1] : sum), 0);
}