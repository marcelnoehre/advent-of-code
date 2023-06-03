import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr: string[] = file.toString().trim().split('');
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(stream: string[]):number {
    for(let i = 0; i < stream.length-3; i++) {
        let key: string[] = [];
        for(let j = 0; j <= 3; j++) {
            key.push(stream[i+j]);
        }
        if((new Set(key)).size === key.length) {
            return i+4;
        }
    }
    return null;
}

function part_2(stream: string[]):number {
    for(let i = 0; i < stream.length-3; i++) {
        let key: string[] = [];
        for(let j = 0; j <= 13; j++) {
            key.push(stream[i+j]);
        }
        if((new Set(key)).size === key.length) {
            return i+14;
        }
    }
    return null;
}
