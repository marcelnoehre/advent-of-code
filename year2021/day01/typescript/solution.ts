import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
console.log(part_1());
console.log(part_2());

function part_1():number {
    return arr.reduce((acc, num, i) => (i > 0 && num > arr[i - 1] ? acc + 1 : acc), 0);
}

function part_2():number {
    return arr.reduce((acc, _, i) => i < arr.length - 3 && arr[i + 1] + arr[i + 2] + arr[i + 3] > arr[i] + arr[i + 1] + arr[i + 2] ? acc + 1 : acc, 0);
}
