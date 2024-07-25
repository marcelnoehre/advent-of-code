import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().split(',').map(Number).sort((a: number, b: number) => a-b);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((res, pos) => res + Math.abs(pos - input[Math.ceil(input.length / 2) - 1]), 0);
}

export function part_2(): number {
  return Math.min(...Array.from({ length: input[input.length - 1] }, (_, i) => input.reduce((res, d) => res + Math.abs(d - i) * (Math.abs(d - i) + 1) / 2, 0)));
}