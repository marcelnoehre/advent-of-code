import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split(',').map((num) => parseInt(num, 10));
console.log(part_1([...arr]));
console.log(part_2([...arr]));

function part_1(arr: number[]):number {
    for(let _ = 0; _ < 80; _++) {
        const length = arr.length;
        for(let i = 0; i < length; i++) {
            if(arr[i] === 0) {
                arr.push(8);
            }
            arr[i] = arr[i] === 0 ? 6 : arr[i] - 1;
        }
    }
    return arr.length;
}

function part_2(arr: number[]):number {
    let occurence: number[] = new Array(9).fill(0);
    arr.forEach((timer) => occurence[timer]++);
    for(let _ = 0; _ < 256; _++) {
        let newOccurence: number[] = new Array(9).fill(0);
        for(let i = 0; i < 8; i++) {
            newOccurence[i] = occurence[i+1];
            if(i === 6) {
                newOccurence[i] += occurence[0];
                newOccurence[8] += occurence[0];
            }
        }
        occurence = [...newOccurence];
    }
    return occurence.reduce((acc, val) => acc + val, 0);
}