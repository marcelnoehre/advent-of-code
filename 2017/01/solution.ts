import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split('').map((num) => parseInt(num, 10));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(numbers: number[]) {
    let sum:number = 0;
    for(let i = 1; i < numbers.length; i++) {
        if(numbers[i] == numbers[i-1]) {
            sum += numbers[i];
        }
    }
    if(numbers[numbers.length-1] == numbers[0]) {
        sum += numbers[0];
    }
    return sum;
}

function part_2(numbers: number[]) {
    let sum:number = 0;
    let forward: number = numbers.length/2;
    for(let i = 0; i < numbers.length; i++) {
        if(i+forward >= numbers.length-1) {
            if(numbers[i] == numbers[forward-(numbers.length-i)]) {
                sum += numbers[i];
            }
        } else {
            if(numbers[i] == numbers[i + forward]) {
                sum += numbers[i];
            }
        }
    }
    return sum;
}