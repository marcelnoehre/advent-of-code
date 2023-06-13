import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[][] = file.toString().trim().split('\n').map((present) => present.split('x').map((value) => parseInt(value, 10)));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.map((box) => box.sort((a, b) => a - b)).reduce((total, [l, w, h]) => total + 2 * (l * w + l * h + w * h) + l * w, 0);
}

function part_2(): number {
    return arr.reduce((total, [l, w, h]) => total + (2 * (l + w) + l * w * h), 0);
}