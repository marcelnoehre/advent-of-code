import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string = file.toString();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
}

export function part_1(): number {
  return null;
}