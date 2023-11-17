import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().trim().split(',').map(Number);
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return simulate([...input], 12, 2);
}

export function part_2(): number {
    return (tmp => 100 * tmp[0] + tmp[1])(Array.from({ length: 5555 }, (_, i) => [Math.floor(i / 100), i % 100]).filter(([noun, verb]) => simulate([...input], noun, verb) === 19690720)[0]);
}

function simulate(codes: number[], noun: number, verb: number): number {
    [codes[1], codes[2]] = [noun, verb];
    for (let i = 0; codes[i] !== 99; i += 4) {
        codes[codes[i + 3]] = codes[i] === 1
            ? codes[codes[i + 1]] + codes[codes[i + 2]]
            : codes[codes[i + 1]] * codes[codes[i + 2]];
    }
    return codes[0];
}