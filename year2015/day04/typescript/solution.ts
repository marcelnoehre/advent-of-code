import { readFileSync } from 'fs';
import { Md5 } from 'ts-md5/dist/md5';

const file: any = readFileSync('../puzzle.txt', 'utf-8');
const key: string = file.toString().trim();
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return mine(5);
}

function part_2(): number {
    return mine(6); 
}

function mine(digits: number): number {
    let counter: number = 0;
    while (!(Md5.hashStr(key + counter).substring(0, digits) === '0'.repeat(digits))) {
        counter++;
    }
    return counter;
}