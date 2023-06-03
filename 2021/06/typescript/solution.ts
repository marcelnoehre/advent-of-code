import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr:number[] = file.toString().trim().split(',').map((num) => parseInt(num, 10));
console.log(part_1([...arr]));
console.log(part_2([...arr]));

function part_1(list: number[]):number {
    for(let j = 0; j < 80; j++) {
        let length: number = list.length;
        for(let i = 0; i < length; i++) {
            if(list[i] === 0) {
                list[i] = 6;
                list.push(8);
            } else {
                list[i]--;
            }
        }
    }
    return list.length;
}

function part_2(arr: number[]):number {
    let occurence: number[] = [0,0,0,0,0,0,0,0,0];
    for(let i = 0; i < arr.length; i++) {
        occurence[arr[i]]++;
    }
    for(let j = 0; j < 256; j++) {
        let newOccurence: number[] = [0,0,0,0,0,0,0,0,0];
        for(let i = 0; i < 8; i++) {
            newOccurence[i] = occurence[i+1];
            if(i === 6) {
                newOccurence[i] += occurence[0];
                newOccurence[8] += occurence[0];
            }
        }
        occurence = [...newOccurence];
    }
    let sum: number = 0;
    occurence.forEach(element => {
        sum += element;
    })
    return sum;
}