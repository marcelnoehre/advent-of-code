import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().split('-').map(Number);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return Array.from({ length: input[1] - input[0] + 1 }, (_, index) => (input[0] + index).toString()).filter(pw => /(.)\1/.test(pw) && pw === pw.split('').sort().join('')).length;
}

export function part_2(): number {
  return Array.from({ length: input[1] - input[0] + 1 }, (_, index) => (input[0] + index).toString()).filter(pw => pw === pw.split('').sort().join('') && pw.split('').sort().some((x, i, a) => x === a[i + 1] && x !== a[i + 2] && x !== a[i - 1])).length;
}