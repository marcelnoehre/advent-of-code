import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.reduce((result, num, index, arr) => 
            arr.includes(2020 - num, index + 1) ? num * (2020 - num) : result, 0);
}

function part_2(): number {
    return arr.reduce((result, num, index, arr) =>
            arr.slice(index + 1).reduce((innerResult, innerNum) =>
            arr.slice(index + 2).reduce((finalResult, finalNum) =>
            num + innerNum + finalNum === 2020 ? num * innerNum * finalNum : finalResult, innerResult), result), 0);
  }
