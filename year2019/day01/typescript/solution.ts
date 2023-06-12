import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.reduce((acc, mass) => acc + Math.floor(mass / 3) - 2, 0);
}

function part_2(): number {
    let sum = 0;
    arr.forEach((mass) => {
        let fuel = (Math.floor(mass / 3) - 2);
        while (fuel > 0) {
            sum += fuel;
            fuel = (Math.floor(fuel / 3) - 2)
        }
    });
    return sum;
}