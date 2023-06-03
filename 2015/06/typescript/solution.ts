import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr:string[][] = file.toString().split('\n').map((instruction) => instruction.replace('\r','').split(' '));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(instructions: string[][]) {
    let lights: boolean[][] = [];
    for(let i = 0; i < 1000; i++) {
        let row: boolean[] = [];
        for(let j = 0; j < 1000; j++) {
            row.push(false);
        }
        lights.push(row);
    }
    for(let i = 0; i < instructions.length; i++) {
        if(instructions[i][0] == 'turn') {
            let newStatus: boolean = instructions[i][1] == 'on';
            let start: number[] = instructions[i][2].split(',').map((position) => parseInt(position, 10));
            let end: number[] = instructions[i][4].split(',').map((position) => parseInt(position, 10));
            for(let x = start[0]; x <= end[0]; x++) {
                for(let y = start[1]; y <= end[1]; y++) {
                    lights[x][y] = newStatus;
                }
            }
        } else {
            let start: number[] = instructions[i][1].split(',').map((position) => parseInt(position, 10));
            let end: number[] = instructions[i][3].split(',').map((position) => parseInt(position, 10));
            for(let x = start[0]; x <= end[0]; x++) {
                for(let y = start[1]; y <= end[1]; y++) {
                    lights[x][y] = !lights[x][y];
                }
            }
        }
    }
    let counter: number = 0;
    for(let x = 0; x < 1000; x++) {
        for(let y = 0; y < 1000; y++) {
            if(lights[x][y]) {
                counter++;
            }
        }
    }
    return counter;
}
function part_2(instructions: string[][]) {
    let lights: number[][] = [];
    for(let i = 0; i < 1000; i++) {
        let row: number[] = [];
        for(let j = 0; j < 1000; j++) {
            row.push(0);
        }
        lights.push(row);
    }

    for(let i = 0; i < instructions.length; i++) {
        if(instructions[i][0] == 'turn') {
            let changes: number = instructions[i][1] == 'on'? 1 : -1;
            let start: number[] = instructions[i][2].split(',').map((position) => parseInt(position, 10));
            let end: number[] = instructions[i][4].split(',').map((position) => parseInt(position, 10));
            for(let x = start[0]; x <= end[0]; x++) {
                for(let y = start[1]; y <= end[1]; y++) {
                    lights[x][y] = lights[x][y] + changes < 0 ? 0 : lights[x][y] + changes;
                }
            }
        } else {
            let start: number[] = instructions[i][1].split(',').map((position) => parseInt(position, 10));
            let end: number[] = instructions[i][3].split(',').map((position) => parseInt(position, 10));
            for(let x = start[0]; x <= end[0]; x++) {
                for(let y = start[1]; y <= end[1]; y++) {
                    lights[x][y] += 2;
                }
            }
        }
    }
    let counter: number = 0;
    for(let x = 0; x < 1000; x++) {
        for(let y = 0; y < 1000; y++) {
            counter += lights[x][y];
        }
    }
    return counter;
}