import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const row:string= file.toString().trim();
console.log(part_1(row));
console.log(part_2(row));

function part_1(row: string): number {
    return null;
}

function part_2(row: string): number {
    return null;
}