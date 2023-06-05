import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[][][] = file.toString().trim().split('\r\n').map((group) => group.split(',').map(tupel => tupel.split('-').map(num => parseInt(num, 10))));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(list: number[][][]):number {
    let sum: number = 0;
    list.forEach(group => {
        if(group[0][0] <= group[1][0] && group[0][1] >= group[1][1]) {
            sum++;
        } else if(group[1][0] <= group[0][0] && group[1][1] >= group[0][1]) {
            sum++;
        }
    });
    return sum;
}

function part_2(list: number[][][]):number {
    let sum: number = 0;
    list.forEach(group => {
        if(group[0][0] >= group[1][0] && group[0][0] <= group[1][1]) {
            sum++;
        } else if(group[1][0] >= group[0][0] && group[1][0] <= group[0][1]) {
            sum++;
        } else if(group[0][1] <= group[1][1] && group[0][1] >= group[1][0]) {
            sum++;
        } else if(group[1][1] <= group[0][1] && group[1][1] >= group[0][0]) {
            sum++;
        } 
    });
    return sum;
}
