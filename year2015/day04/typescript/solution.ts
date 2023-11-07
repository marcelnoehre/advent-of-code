import { readFileSync } from 'fs';
import { Md5 } from 'ts-md5/dist/md5';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string = file.toString().trim();
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return mine(5);
}

export function part_2(): number {
    return mine(6); 
}

function mine(digits: number): number {
    let counter: number = 0;
    while (!(Md5.hashStr(input + counter).substring(0, digits) === '0'.repeat(digits))) {
        counter++;
    }
    return counter;
}