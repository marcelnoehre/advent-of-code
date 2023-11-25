import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const pattern: RegExp = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
const input: number[][] = file.toString().split('\n').map((pos) => pos.match(pattern).slice(1, 5).map(Number));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  const [row, beacons]: Set<number>[] = [new Set(), new Set()];
  input.forEach((tuple) => {
    const dist: number = Math.abs(tuple[0] - tuple[2]) + Math.abs(tuple[1] - tuple[3]);
    for (let i = tuple[0] - (dist - Math.abs(tuple[1] - 2000000)); i <= tuple[0] + (dist - Math.abs(tuple[1] - 2000000)); i++) row.add(i);
    if (tuple[3] === 2000000) beacons.add(tuple[2]);
  });
  return Array.from(row).filter((x) => !beacons.has(x)).length;
}

export function part_2(): number {
  const [sensors, minx, miny, maxx, maxy] = [[], 0, 0, 4000000, 4000000];
  input.forEach((tuple) => sensors.push([tuple[0], tuple[1], Math.abs(tuple[0] - tuple[2]) + Math.abs(tuple[1] - tuple[3])]));
  for(let sensor of sensors) for (let [x, y] of generateField(sensor)) if (minx <= x && x <= maxx && miny <= y && y <= maxy && sensors.every(([sx, sy, diff]) => Math.abs(x - sx) + Math.abs(y - sy) > diff)) return x * 4000000 + y;
}

function generateField(line: number[]): number[][] {
  const field: number[][] = [];
  [[line[0], line[1] - line[2] - 1, line[0] + line[2] + 1, line[1]], [line[0] + line[2] + 1, line[1], line[0], line[1] + line[2] + 1], [line[0], line[1] + line[2] + 1, line[0] - line[2] - 1, line[1]], [line[0] - line[2] - 1, line[1], line[0], line[1] - line[2] - 1]].forEach((row) => {
    const xrow: number[] = row[0] < row[2] ? Array.from({ length: row[2] - row[0] + 1 }, (_, index) => row[0] + index) : Array.from({ length: row[0] - row[2] + 1 }, (_, index) => row[0] - index);
    const yrow: number[] = row[1] < row[3] ? Array.from({ length: row[3] - row[1] + 1 }, (_, index) => row[1] + index) : Array.from({ length: row[1] - row[3] + 1 }, (_, index) => row[1] - index);
    if (row[0] === row[2]) for (const y of yrow) field.push[row[0], y];
    else if (row[1] === row[3]) for (const x of xrow) field.push([x, row[1]]);
    else for (let i = 0; i < Math.min(xrow.length, yrow.length); i++) field.push([xrow[i], yrow[i]]);
  });
  return field;
}