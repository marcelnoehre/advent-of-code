import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:string[][] = file.toString().trim().split('\n').map((password) => password.split(' '));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return [...arr].filter(([borders, char, password]) => {
        const [min, max]: number[] = borders.split('-').map(Number);
        const count: number = password.split(char.replace(':', '')).length - 1;
        return min <= count && count <= max;
    }).length;
}

function part_2(): number {
    return arr.filter(([borders, char, password]) => {
        const [first, second]: number[] = borders.split('-').map(Number);
        return (password[first - 1] === char.replace(':', '')) !== (password[second - 1] === char.replace(':', ''));
    }).length;
}
