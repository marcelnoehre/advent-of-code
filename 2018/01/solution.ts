import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(numbers: number[]): number {
    let frequency: number = 0;
    for(let i = 0; i < numbers.length; i++) {
        frequency += numbers[i];
    }
    return frequency;
}

function part_2(numbers: number[]):number {
    let frequencies: number[] = [0];
    let frequency: number = 0;
    do {
        for(let i = 0; i < numbers.length; i++) {
            frequency += numbers[i];
            if(frequencies.includes(frequency)) {
                return frequency;
            } else {
                frequencies.push(frequency);
            }
        }
    } while(true);
}