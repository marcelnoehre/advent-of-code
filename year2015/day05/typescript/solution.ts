import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:string[]= file.toString().trim().split('\n');
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(input: string[]): number {
    let counter: number = 0; 
    const vowelList: string[] = ['a', 'e', 'i', 'o', 'u'];
    const naughtyList: string[] = ['ab', 'cd', 'pq', 'xy'];
    for(let i = 0; i < input.length; i++) {
        let vowelCounter: number = 0;
        let previous: string = '';
        let previousCheck: boolean = false;
        let naughtyCheck: boolean = true;
        for(let j = 0; j < input[i].length; j++) {
            if(vowelList.includes(input[i][j])) {
                vowelCounter++;
            }
            if(input[i][j] == previous) {
                previousCheck = true;
            }
            previous = input[i][j];
        }
        for(let j = 0; j < naughtyList.length; j++) {
            if(input[i].includes(naughtyList[j])) {
                naughtyCheck = false;
            }
        }
        if(vowelCounter >= 3 && previousCheck && naughtyCheck) {
            counter++;
        }
    }
    return counter;
}

function part_2(input: string[]) {
    const pairCheck: any = /([a-z][a-z]).*\1/;
    const spacerCheck: any = /([a-z])[a-z]\1/;
    let counter: number = 0;
    for(let i = 0; i < input.length; i++) {
        if(pairCheck.test(input[i]) && spacerCheck.test(input[i])) {
            counter++;
        }
    }
    return counter;
}
