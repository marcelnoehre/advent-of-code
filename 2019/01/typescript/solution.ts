import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(numbers: number[]): number {
    let sum: number = 0;
    for(let i = 0; i < numbers.length; i++) {
        sum += (Math.floor(numbers[i]/3)-2);
    }
    return sum;
}

function part_2(numbers: number[]): number {
    let sum: number = 0;
    for(let i = 0; i < numbers.length; i++) {
        let fuel = (Math.floor(numbers[i]/3)-2); 
        do {
            sum += fuel;
            fuel = (Math.floor(fuel/3)-2);
        } while(fuel > 0);
    }
    return sum;
}