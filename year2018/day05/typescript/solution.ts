import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('');
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1() {
    return react(input).length;
}

export function part_2() {
    return Array.from({ length: 26 }, (_, i) => {
        const [unit, reacted] = [String.fromCharCode('a'.charCodeAt(0) + i), react(input.filter(unit => unit.toLowerCase() !== String.fromCharCode('a'.charCodeAt(0) + i)))];
        return { unit, reacted };
    }).reduce((best, { unit, reacted }) => reacted.length < best.reacted.length ? { unit, reacted } : best, { reacted: input }).reacted.length;
}

function react(units: string[]): string[] {
    return units.reduce((result, unit) => (result.length > 0 && Math.abs(unit.charCodeAt(0) - result[result.length - 1].charCodeAt(0)) === 32 ? result.slice(0, -1) : result.concat(unit)), []);
}