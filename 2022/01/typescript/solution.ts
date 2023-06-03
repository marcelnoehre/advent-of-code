import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr: number[] = file.toString().trim().split('\r\n').map((num) => parseInt(num, 10));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(list: number[]):number {
    let elves: number[] = [0];
    let elveId: number = 0;
    for(let i = 0; i < list.length; i++) {
        if(isNaN(list[i])) {
            elveId++;
            elves.push(0)
        } else {
            elves[elveId] += list[i];
        }
    }
    return Math.max(...elves);
}

function part_2(list: number[]):number {
    let elves: number[] = [0];
    let elveId: number = 0;
    for(let i = 0; i < list.length; i++) {
        if(isNaN(list[i])) {
            elveId++;
            elves.push(0)
        } else {
            elves[elveId] += list[i];
        }
    }
    elves.sort(function(a, b){return b-a});
    return elves[0]+elves[1]+elves[2];
}
