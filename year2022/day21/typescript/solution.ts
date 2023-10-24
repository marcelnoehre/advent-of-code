import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: { [key: string]: string[] } = Object.fromEntries(file.toString().split('\n').map(line => [line.split(' ')[0].slice(0, -1), line.split(':')[1].split(' ').slice(1, 4)]));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return Math.floor(yell('root', -1));
}

function part_2(): number {
    const [p1, p2]: string[] = yell(arr['root'][2], 0) !== yell(arr['root'][0], 1) ? [arr['root'][0], arr['root'][2]] : [arr['root'][2], arr['root'][0]];
    let [low, high]: number[] = [0, 1e20];
    while (low + 1 < high) [low, high] = yell(p2, 0) - yell(p1, Math.floor((low + high) / 2)) <= 0 ? [Math.floor((low + high) / 2), high] : [low, Math.floor((low + high) / 2)];
    return low;
}

function yell(name: string, num: number): number { 
    if (name === 'humn' && num >= 0) return num;
    if(!isNaN(Number(arr[name][0]))) return Number(arr[name][0]);
    return eval(`yell(arr[name][0], num) ${arr[name][1]} yell(arr[name][2], num)`);
}
