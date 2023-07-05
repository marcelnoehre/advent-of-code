import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
let elves: number[] = [];
setElves();
console.log(part_1());
console.log(part_2());

function part_1():number {
    return Math.max(...elves);
}

function part_2():number {
    elves.sort(function(a, b){return b-a});
    return elves.slice(0, 3).reduce((acc, curr) => acc + curr, 0);
}

function setElves() {
    let sum = 0;
    arr.forEach(calory => {
        if(isNaN(calory)) {
            elves.push(sum);
            sum = 0;
        } else {
            sum += calory;
        }
    });
}
