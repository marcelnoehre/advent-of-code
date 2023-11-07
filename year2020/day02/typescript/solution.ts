import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().trim().split('\n').map((password) => password.split(' '));
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return [...input].filter(([borders, char, password]) => {
        const [min, max]: number[] = borders.split('-').map(Number);
        const count: number = password.split(char.replace(':', '')).length - 1;
        return min <= count && count <= max;
    }).length;
}

export function part_2(): number {
    return input.filter(([borders, char, password]) => {
        const [first, second]: number[] = borders.split('-').map(Number);
        return (password[first - 1] === char.replace(':', '')) !== (password[second - 1] === char.replace(':', ''));
    }).length;
}
