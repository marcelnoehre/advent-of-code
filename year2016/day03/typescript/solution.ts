import { readFileSync } from 'fs';

const file: any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[][] = file.toString().split('\n').map((row) => row.trim().split(/\s+/).map((number) => Number(number)));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.filter(([a, b, c]) => checkTriangle([a, b, c])).length;
}

function part_2(): number {
    let counter = 0;
    for(let i = 0; i < arr.length; i += 3) {
        for(let j = 0; j < 3; j++) {
            if(checkTriangle([arr[i][j], arr[i + 1][j], arr[i + 2][j]])) {
                counter ++;
            }
        }
    }
    return counter;
}

function checkTriangle([a, b, c]): boolean {
    return [a + b, a + c, b + c].every(sum => sum > (a + b + c - sum));
}