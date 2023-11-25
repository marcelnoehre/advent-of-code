import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split('\n').map((pass) => [pass.slice(0, 7), pass.slice(-3)]);
const seats: number[] = [];
setupSeats();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return Math.max(...seats)
}

export function part_2(): number {
  return seats.sort((a, b) => a - b).find((seat, index) => index > 0 && seat - seats[index - 1] !== 1) - 1 || 0;
}

function setupSeats(): void {
  input.forEach((pass) => {
    let [rl, ru, cl, cu] = [0, 127, 0, 7];
    pass[0].split('').forEach((char) => char === 'F' ? ru = Math.floor((rl + ru) / 2) : rl = Math.ceil((rl + ru) / 2));
    pass[1].split('').forEach((char) => char === 'L' ? cu = Math.floor((cl + cu) / 2) : cl = Math.ceil((cl + cu) / 2));
    seats.push(rl * 8 + cl);
  });
}