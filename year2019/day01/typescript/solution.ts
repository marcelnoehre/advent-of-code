import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().trim().split('\n').map(Number);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, mass) => acc + Math.floor(mass / 3) - 2, 0);
}

export function part_2(): number {
  let sum = 0;
  input.forEach((mass) => {
    let fuel = (Math.floor(mass / 3) - 2);
    while (fuel > 0) {
      sum += fuel;
      fuel = (Math.floor(fuel / 3) - 2)
    }
  });
  return sum;
}