import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: { [key: string]: string[] } = Object.fromEntries(file.toString().split('\n').map(line => [line.split(' ')[0].slice(0, -1), line.split(':')[1].split(' ').slice(1, 4)]));
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return Math.floor(yell('root', -1));
}

export function part_2(): number {
    const [p1, p2]: string[] = yell(input['root'][2], 0) !== yell(input['root'][0], 1) ? [input['root'][0], input['root'][2]] : [input['root'][2], input['root'][0]];
    let [low, high]: number[] = [0, 1e20];
    while (low + 1 < high) [low, high] = yell(p2, 0) - yell(p1, Math.floor((low + high) / 2)) <= 0 ? [Math.floor((low + high) / 2), high] : [low, Math.floor((low + high) / 2)];
    return low;
}

function yell(name: string, num: number): number { 
    if (name === 'humn' && num >= 0) return num;
    if(!isNaN(Number(input[name][0]))) return Number(input[name][0]);
    return eval(`yell(input[name][0], num) ${input[name][1]} yell(input[name][2], num)`);
}
