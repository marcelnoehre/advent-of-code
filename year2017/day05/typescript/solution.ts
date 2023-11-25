import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().split('\n').map(Number);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return simulate([...input], () => 1);
}

export function part_2(): number {
  return simulate([...input], offset => (offset >= 3 ? -1 : 1));
}

function simulate(inst: number[], offsetRule: (offset: number) => number): number {
  let [ptr, jumps] = [0, 0];
  while (ptr >= 0 && ptr < inst.length) [inst[ptr], ptr, jumps] = [(inst[ptr] + offsetRule(inst[ptr])), ptr + inst[ptr], ++jumps];
  return jumps;
}