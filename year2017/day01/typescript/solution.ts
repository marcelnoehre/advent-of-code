import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split('').map((num) => parseInt(num, 10));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.filter((num, index) => num === arr[(index + 1) % arr.length]).reduce((acc, val) => acc + val, 0);

}

function part_2(): number {
    return arr.reduce((acc, num, i) => num === arr[(i + arr.length / 2) % arr.length] ? acc + num : acc, 0);
}