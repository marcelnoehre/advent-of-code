import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
const elves: number[] = [];
setElves();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return Math.max(...elves);
}

export function part_2(): number {
  elves.sort(function(a, b){return b-a});
  return elves.slice(0, 3).reduce((acc, curr) => acc + curr, 0);
}

function setElves() {
  let sum = 0;
  input.forEach(calory => {
    if(isNaN(calory)) {
      elves.push(sum);
      sum = 0;
    } else {
      sum += calory;
    }
  });
}