import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().trim().split('\n').map(Number);
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return input.reduce((result, num, index, input) => 
            input.includes(2020 - num, index + 1) ? num * (2020 - num) : result, 0);
}

export function part_2(): number {
    return input.reduce((result, num, index, input) =>
            input.slice(index + 1).reduce((innerResult, innerNum) =>
            input.slice(index + 2).reduce((finalResult, finalNum) =>
            num + innerNum + finalNum === 2020 ? num * innerNum * finalNum : finalResult, innerResult), result), 0);
}
