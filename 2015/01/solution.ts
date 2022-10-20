import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const row:string= file.toString().trim();
console.log(part_1(row));
console.log(part_2(row));

function part_1(row: string): number {
    let floor: number = 0;
    for(let i = 0; i < row.length; i++) {
        floor += row[i] == '('? 1:-1;
    }
    return floor;
}

function part_2(row: string): number {
    let floor: number = 0;
    for(let i = 0; i < row.length; i++) {
        floor += row[i] == '('? 1:-1;
        if(floor == -1) {
            return i+1;
        }
    }
    return -1;
}