import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(numbers: number[]): number {
    for(let i = 0; i < numbers.length; i++) {
        for(let y = 0; y < numbers.length; y++) {
            if(i != y && numbers[i] + numbers[y] == 2020) {
                return numbers[i] * numbers[y];
            }
        }
    } 
    return null;
}

function part_2(numbers: number[]): number {
    for(let i = 0; i < numbers.length; i++) {
        for(let y = 0; y < numbers.length; y++) {
            for(let x = 0; x < numbers.length; x++) {
                if(i != y && i != x && y != x) {
                    if(numbers[i] + numbers[y] + numbers[x] == 2020) {
                        return numbers[i] * numbers[y] * numbers[x];
                    }
                }
            }
        }
    } 
}
