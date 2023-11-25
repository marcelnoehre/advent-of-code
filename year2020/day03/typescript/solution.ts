import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return checkTrees(3);
}

export function part_2(): number {
  return [1, 3, 5, 7].reduce((acc, step) => acc * checkTrees(step), 1) * checkTrees(1, 1);
}

function checkTrees(step: number, skip?: number): number {
  let [index, counter] = [0, 0];
  for(let i = 0; i < input.length; i++) {
    if (input[i].charAt(index) === '#') counter++;
    index = (index + step) % input[i].length;
    i = skip ? i + skip : i;
  };
  return counter;
}
