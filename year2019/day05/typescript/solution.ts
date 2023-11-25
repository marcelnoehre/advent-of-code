import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().split(',').map(Number);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return calc(1);
}

export function part_2(): number {
  return calc(5);
}

function calc(mode: number): number {
  let [program, result, i] = [[...input], -1, 0];
  const getValue = (param: number, mode: number): number => (mode === 1 ? param : program[param]);
  while (program[i] % 100 !== 99) {
    if ([1, 2, 7, 8].includes(program[i] % 100)) {
      const [p1, p2, p3] = program.slice(i + 1, i + 4);
      const [val1, val2] = [getValue(p1, Math.floor((program[i] - program[i] % 100) / 100) % 10), getValue(p2, Math.floor((program[i] - program[i] % 100) / 1000) % 10)];
      if (program[i] % 100 === 1) program[p3] = val1 + val2;
      else if (program[i] % 100 === 2) program[p3] = val1 * val2;
      else if (program[i] % 100 === 7) program[p3] = val1 < val2 ? 1 : 0;
      else if (program[i] % 100 === 8) program[p3] = val1 === val2 ? 1 : 0;
      i += 4;
    } else if ([5, 6].includes(program[i] % 100)) {
      const [p1, p2] = program.slice(i + 1, i + 3);
      const [val1, val2] = [getValue(p1, Math.floor((program[i] - program[i] % 100) / 100) % 10), getValue(p2, Math.floor((program[i] - program[i] % 100) / 1000) % 10)];
      if ((program[i] % 100 === 5 && val1 !== 0) || (program[i] % 100 === 6 && val1 === 0)) i = val2;
      else i += 3;
    } else if (program[i] % 100 === 3) {
      program[program[i + 1]] = mode;
      i += 2;
    } else if (program[i] % 100 === 4) {
      result = getValue(program[i + 1], Math.floor((program[i] - program[i] % 100) / 100) % 10);
      i += 2;
    }
  }
  return result;
}