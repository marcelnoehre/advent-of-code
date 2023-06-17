import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.reduce((acc, num) => acc + num, 0);

}

function part_2(): number {
    let [frequencies, frequency] = [new Set<number>(), 0];
    while (true) {
        for (const number of arr) {
            if (frequencies.has(frequency += number)) {
                return frequency;
            } 
            frequencies.add(frequency);
        }
    }
}