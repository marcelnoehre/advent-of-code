import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().trim().split('');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1():number {
  return getMarker(4);
}

export function part_2():number {
  return getMarker(14);
}

function getMarker(length: number): number {
  for(let i = 0; i < input.length - 3; i++) {
    let key: string[] = [];
    for(let j = 0; j <= length - 1; j++) key.push(input[i + j]);
    if((new Set(key)).size === key.length) return i + length;
  }
}