import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:string[] = file.toString().split('\n');
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return checkTrees(3);
}

function part_2(): number {
    return [1, 3, 5, 7].reduce((acc, step) => acc * checkTrees(step), 1) * checkTrees(1, 1);
}

function checkTrees(step: number, skip?: number): number {
    let [index, counter] = [0, 0];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i].charAt(index) === '#') counter++;
        index = (index + step) % arr[i].length;
        i = skip ? i + skip : i;
    };
    return counter;    
}

