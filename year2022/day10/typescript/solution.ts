import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split('\n').map((row) => row.split(' '));
let stages: number[] = [20, 60, 100, 140, 180, 220];
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [cycle, sum, x]: number[] = [0, 0, 1];
  input.forEach(instruction => {
    cycle++;
    if(stages.includes(cycle)) sum += cycle * x;
    if(instruction.length === 2) {
      cycle++;
      if(stages.includes(cycle)) sum += cycle * x;
      x += parseInt(instruction[1], 10);
    }
  });
  return sum;
}

export function part_2(): string {
  stages = stages.map((num) => num + 20);
  let [sprite, cycle, row, x] = [[0, 1, 2], 1, '', 1]
  input.forEach(instruction => {
    if(stages.includes(cycle - 1)) row += '\n';
    row += sprite.includes((cycle - 1) % 40) ? '#' : '.';
    cycle++;
    if(instruction.length === 2) {
      if(stages.includes(cycle - 1)) row += '\n';
      row += sprite.includes((cycle - 1) % 40) ? '#' : '.';
      x += parseInt(instruction[1], 10);
      sprite = [x - 1, x, x + 1];
      cycle++;
    }
  });
  return row;
}