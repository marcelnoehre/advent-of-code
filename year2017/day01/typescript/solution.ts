import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().trim().split('').map(Number);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.filter((num, index) => num === input[(index + 1) % input.length]).reduce((acc, val) => acc + val, 0);

}

export function part_2(): number {
  return input.reduce((acc, num, i) => num === input[(i + input.length / 2) % input.length] ? acc + num : acc, 0);
}