import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: string[] = file.toString().trim().split('');
console.log(part_1());
console.log(part_2());

function part_1():number {
    return getMarker(4);
}

function part_2():number {
    return getMarker(14);
}

function getMarker(length: number): number {
    for(let i = 0; i < arr.length - 3; i++) {
        let key: string[] = [];
        for(let j = 0; j <= length - 1; j++) {
            key.push(arr[i + j]);
        }
        if((new Set(key)).size === key.length) {
            return i + length;
        }
    }
}
