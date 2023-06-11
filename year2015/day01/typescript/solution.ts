import { readFileSync } from 'fs';

const file: string = readFileSync('../puzzle.txt', 'utf-8').toString().trim();
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return file.split('').reduce((acc, char) => acc + (char === '(' ? 1 : -1), 0);
}

function part_2(): number {
    return file.split('').findIndex((_, i, a) => a.slice(0, i + 1).reduce((s, c) => s + (c === '(' ? 1 : -1), 0) === -1) + 1;
}