import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().split('\n').map((row) => row.trim().split(/\s+/).map((number) => Number(number)));
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return input.filter(([a, b, c]) => checkTriangle([a, b, c])).length;
}

export function part_2(): number {
    let counter = 0;
    for(let i = 0; i < input.length; i += 3) {
        for(let j = 0; j < 3; j++) {
            if(checkTriangle([input[i][j], input[i + 1][j], input[i + 2][j]])) {
                counter ++;
            }
        }
    }
    return counter;
}

function checkTriangle([a, b, c]): boolean {
    return [a + b, a + c, b + c].every(sum => sum > (a + b + c - sum));
}