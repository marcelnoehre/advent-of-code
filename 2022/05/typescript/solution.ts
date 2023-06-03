import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr = file.toString().split('\r\n\r\n');
console.log(part_1(arr[0].toString().split('\r\n'), arr[1].toString().split('\r\n').map((row) => row.split(' ').map((element) => parseInt(element)))));
console.log(part_2(arr[0].toString().split('\r\n'), arr[1].toString().split('\r\n').map((row) => row.split(' ').map((element) => parseInt(element)))));

function part_1(initStacks: string[], instructions: number[]):string {
    let stacks: string[][] = [[],[],[],[],[],[],[],[],[]];
    let positions: number[] = [1, 5, 9, 13, 17, 21, 25, 29, 33];
    for(let i = initStacks.length-2; i >= 0; i--) {
        for(let s = 0; s < positions.length; s++) {
            if(initStacks[i].charAt(positions[s]) !== ' ') {
                stacks[s].push(initStacks[i].charAt(positions[s]));
            }
        };
    }
    instructions.forEach(instruction => {
        for(let i = 0; i < instruction[1]; i++) {
            stacks[instruction[5]-1].push(stacks[instruction[3]-1].pop());
        }
    });
    let key: string = '';
    for(let i = 0; i < positions.length; i++) {
        key += stacks[i].pop();
    }
    return key;
}

function part_2(initStacks: string[], instructions: number[]):string {
    let stacks: string[][] = [[],[],[],[],[],[],[],[],[]];
    let positions: number[] = [1, 5, 9, 13, 17, 21, 25, 29, 33];
    for(let i = initStacks.length-2; i >= 0; i--) {
        for(let s = 0; s < positions.length; s++) {
            if(initStacks[i].charAt(positions[s]) !== ' ') {
                stacks[s].push(initStacks[i].charAt(positions[s]));
            }
        };
    }
    instructions.forEach(instruction => {
        let tmp: string[] = [];
        for(let i = 0; i < instruction[1]; i++) {
            tmp.push(stacks[instruction[3]-1].pop());
        }
        for(let i = tmp.length-1; i >= 0; i--) {
            stacks[instruction[5]-1].push(tmp[i]);
        }
    });
    let key: string = '';
    for(let i = 0; i < positions.length; i++) {
        key += stacks[i].pop();
    }
    return key;
}
