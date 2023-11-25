import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().trim().split('\n').map(Number);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, num) => acc + num, 0);
}

export function part_2(): number {
  let [frequencies, frequency] = [new Set<number>(), 0];
  while (true) {
    for (const number of input) {
      if (frequencies.has(frequency += number)) {
        return frequency;
      }
      frequencies.add(frequency);
    }
  }
}