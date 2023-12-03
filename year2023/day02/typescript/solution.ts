import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().trim().split('\n');
const max: Record<string, number> = { red: 12, green: 13, blue: 14 };
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, row) => {
    return row.split(": ")[1].split(/; /g).some((subs) => subs.split(/, /g).some((tuple) => {
      return Number(tuple.trim().split(" ")[0]) > max[tuple.trim().split(" ")[1]];
    })) ? acc : acc + Number(row.split(": ")[0].split(" ")[1]); 
  }, 0);
}

export function part_2(): number {
  return input.reduce((acc, row) => {
    const map: Map<string, number> = new Map();
    row.split(": ")[1].split(/; /g).forEach(subs => subs.split(/, /g).forEach(tuple => map.set(tuple.trim().split(" ")[1], Math.max(map.get(tuple.trim().split(" ")[1]) ?? 0, Number(tuple.trim().split(" ")[0])))));
    return acc + [...map.values()].reduce((acc, value) => acc * value, 1);
  }, 0);
}