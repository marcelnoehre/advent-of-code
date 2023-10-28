import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:number[] = file.toString().split('-').map(Number);
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return Array.from({ length: arr[1] - arr[0] + 1 }, (_, index) => (arr[0] + index).toString()).filter(pw => /(.)\1/.test(pw) && pw === pw.split('').sort().join('')).length;
}

function part_2(): number {
    return Array.from({ length: arr[1] - arr[0] + 1 }, (_, index) => (arr[0] + index).toString()).filter(pw => pw === pw.split('').sort().join('') && pw.split('').sort().some((x, i, a) => x === a[i + 1] && x !== a[i + 2] && x !== a[i - 1])).length;
}
