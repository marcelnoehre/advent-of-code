import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.filter(passphrase => new Set(passphrase.split(' ')).size === passphrase.split(' ').length).length;
}

export function part_2(): number {
  return input.filter(passphrase => new Set(passphrase.split(' ').map(word => word.split('').sort().join(''))).size === passphrase.split(' ').length).length;
}