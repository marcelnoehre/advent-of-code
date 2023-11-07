import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().trim().split('\n').map(Number);
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1():number {
    return input.reduce((acc, num, i) => (i > 0 && num > input[i - 1] ? acc + 1 : acc), 0);
}

export function part_2():number {
    return input.reduce((acc, _, i) => i < input.length - 3 && input[i + 1] + input[i + 2] + input[i + 3] > input[i] + input[i + 1] + input[i + 2] ? acc + 1 : acc, 0);
}
