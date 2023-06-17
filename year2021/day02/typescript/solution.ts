import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:[string, number][] = file.toString().trim().split('\n').map((line) => [line.split(' ')[0], parseInt(line.split(' ')[1], 10)]);
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.reduce(([h, d], [ac, v]) => ac === 'forward' ? [h + v, d] : ac === 'down' ? [h, d + v] : [h, d - v], [0, 0]).reduce((a, b) => a * b);
}

function part_2(): number {
    return arr.reduce(([h, d, a], [ac, v]) => (ac === 'forward' ? [h + v, d + a * v, a] : ac === 'down' ? [h, d, a + v] : [h, d, a - v]), [0, 0, 0]).slice(0, 2).reduce((a, b) => a * b);
}