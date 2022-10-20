import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
let arr: number[] = file.toString().trim().split('\n').map((num) => parseInt(num, 10));
part_1(arr);
part_2(arr);

function part_1(arr: number[]) {
    let counter: number = 0;
    for(let i = 0; i < arr.length-1; i++) {
        if(arr[i+1] > arr[i]) {
            counter++;
        }
    }
    console.log(counter);
}

function part_2(arr: number[]) {
    let counter: number = 0;
    for(let i = 0; i < arr.length-3; i++) {
        let firstGroup: number = arr[i]+arr[i+1]+arr[i+2];
        let secondGroup: number = arr[i+1]+arr[i+2]+arr[i+3];
        if(secondGroup>firstGroup) {
            counter++;
        }
    }
    console.log(counter);
}
