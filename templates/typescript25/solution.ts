import { readFileSync } from 'fs';

const file:any = readFileSync('../example.txt', 'utf-8');
const arr:string[][] = file.toString();
console.log(part_1());

export function part_1(): number {
  return null;
}