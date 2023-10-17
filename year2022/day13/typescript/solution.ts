import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:any[][] = file.toString().split('\n\n').map((pair) => pair.split('\n').map((item) => JSON.parse(item)));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.reduce((sum, curr, i) => compare(curr[0], curr[1]) ? sum + i + 1 : sum, 0);
}

function part_2(): number {
    const tmp = [[[2]], [[6]]].concat(...arr).sort((a, b) => compare(a, b) ? -1 : 1);
    return ((tmp.findIndex(item => JSON.stringify(item) === JSON.stringify([[2]])) + 1) ?? 1)
        * ((tmp.findIndex(item => JSON.stringify(item) === JSON.stringify([[6]])) + 1) ?? 1);
}

function compare(a: any, b: any): boolean | null {
    if (typeof a === 'number' && typeof b === 'number') return a < b ? true : a > b ? false : null;
    if (typeof a === 'number') a = [a];
    if (typeof b === 'number') b = [b];
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if(compare(a[i], b[i]) !== null) return compare(a[i], b[i]);
    }
    return a.length < b.length ? true : a.length > b.length ? false : null;
}
