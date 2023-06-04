import { readFileSync } from 'fs';
import { Md5 } from 'ts-md5/dist/md5';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const row:string = file.toString().trim();
console.log(part_1(row));
console.log(part_2(row));

function part_1(key: string): number {
    let counter: number = 0;
    do {
        if(Md5.hashStr(key + counter).substring(0,5) == '00000') {
            return counter;
        } else {
            counter++;
        }
    } while(true);
}

function part_2(key: string): number {
    let counter: number = 0;
    do {
        if(Md5.hashStr(key + counter).substring(0,6) == '000000') {
            return counter;
        } else {
            counter++;
        }
    } while(true);
}