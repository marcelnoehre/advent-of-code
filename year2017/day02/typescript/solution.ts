import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[][] = file.toString().trim().split('\n').map((row) => row.split('\t').map((number) => parseInt(number, 10)));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.reduce((acc, row) => acc + Math.max(...row) - Math.min(...row), 0);
}

function part_2(): number {
    return arr.reduce((acc, row) => {
        const even = row.reduce((pair, num, index) => {
            const div = row.find((n, i) => i !== index && n % num === 0);
            return div ? [div, num] : pair;
        }, []);
        return acc + even[0] / even[1];
    }, 0);
}