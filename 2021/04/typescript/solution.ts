import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:string[] = file.toString().trim().split('\r\n\r\n');
const numbers: number[] = arr[0].trim().split(',').map((num) => parseInt(num, 10));
const boards: number[][][] = arr.slice(1, arr.length).map((board) => board.split('\r\n').map((row) => row.trim().split(/\s+/).map((number) => parseInt(number, 10))))
console.log(part_1(numbers, boards));
console.log(part_2(numbers, boards));

function part_1(numbers: number[], boards: number[][][]):number {
    let drawn: number[] = [];
    let latest: number;
    for(let i = 0; i < numbers.length; i++) {
        drawn.push(numbers[i]);
        latest = numbers[i];
        for(let x = 0; x < boards.length; x++) {
            if(drawn.length >= 5) {
                let bingo: boolean = false;
                for(let y = 0; y < 5; y++) {
                    let horizontal: boolean = true;
                    for(let z = 0; z < 5; z++) {
                        if(!drawn.includes(boards[x][y][z])) {
                            horizontal = false;
                            z = 5;
                        }
                    }
                    if(horizontal) {
                        bingo = true;
                        y = 5;
                    }
                }
                if(!bingo) {
                    for(let z = 0; z < 5; z++) {
                        let vertical: boolean = true;
                        for(let y = 0; y < 5; y++) {
                            if(!drawn.includes(boards[x][y][z])) {
                                vertical = false;
                                y = 5;
                            }
                        }
                        if(vertical) {
                            bingo = true;
                            z = 5;
                        }
                    }
                }
                if(bingo) {
                    let sum = 0; 
                    for(let y = 0; y < 5; y++) {
                        for(let z = 0; z < 5; z++) {
                            if(!drawn.includes(boards[x][y][z])) {
                                sum += boards[x][y][z];
                            }
                        }
                    }
                    return sum * latest;
                }
            }
        }
    }
}

function part_2(numbers: number[], boards: number[][][]): number {
    let drawn: number[] = [];
    let done: number[] = [];
    let latest: number;
    for(let i = 0; i < numbers.length; i++) {
        drawn.push(numbers[i]);
        latest = numbers[i];
        for(let x = 0; x < boards.length; x++) {
            if(!done.includes(x)) {
                if(drawn.length >= 5) {
                    let bingo: boolean = false;
                    for(let y = 0; y < 5; y++) {
                        let horizontal: boolean = true;
                        for(let z = 0; z < 5; z++) {
                            if(!drawn.includes(boards[x][y][z])) {
                                horizontal = false;
                                z = 5;
                            }
                        }
                        if(horizontal) {
                            bingo = true;
                            y = 5;
                        }
                    }
                    if(!bingo) {
                        for(let z = 0; z < 5; z++) {
                            let vertical: boolean = true;
                            for(let y = 0; y < 5; y++) {
                                if(!drawn.includes(boards[x][y][z])) {
                                    vertical = false;
                                    y = 5;
                                }
                            }
                            if(vertical) {
                                bingo = true;
                                z = 5;
                            }
                        }
                    }
                    if(bingo) {
                        if(done.length == boards.length-1) {
                            let sum = 0; 
                            for(let y = 0; y < 5; y++) {
                                for(let z = 0; z < 5; z++) {
                                    if(!drawn.includes(boards[x][y][z])) {
                                        sum += boards[x][y][z];
                                    }
                                }
                            }
                            return sum * latest;       
                        } else {
                            done.push(x);
                        }
                    }
                } 
            }
        }
    }
}
