import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr:number[][] = file.toString().trim().split('\n').map((row) => row.split(' -> ').map((side) => side.split(',').map((num) => parseInt(num, 10))));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(lines: number[][]):number {
    let field: number[][] = []
    for(let y = 0; y < 1000; y++) {
        let row: number[] = []; 
        for(let x = 0; x < 1000; x++) {
            row.push(0);
        }
        field.push(row);
    }
    for(let i = 0; i < lines.length; i++) {
        if(lines[i][0][0] === lines[i][1][0]) {
            let lower: number = lines[i][0][1] < lines[i][1][1] ? lines[i][0][1] : lines[i][1][1]; 
            let upper: number = lines[i][0][1] < lines[i][1][1] ? lines[i][1][1] : lines[i][0][1];
            for(let y = lower; y <= upper; y++) {
                field[lines[i][0][0]][y]++;
            }
        } else if(lines[i][0][1] === lines[i][1][1]) {
            let lower: number = lines[i][0][0] < lines[i][1][0] ? lines[i][0][0] : lines[i][1][0]; 
            let upper: number = lines[i][0][0] < lines[i][1][0] ? lines[i][1][0] : lines[i][0][0];
            for(let x = lower; x <= upper; x++) {
                field[x][lines[i][0][1]]++;
            }
        }
    }
    let counter: number = 0;
    for(let y = 0; y < 1000; y++) {
        for(let x = 0; x < 1000; x++) {
            if(field[x][y] >= 2) {
                counter++;
            }
        }
    }
    return counter;
}

function part_2(lines: number[][]):number {
    let field: number[][] = []
    for(let y = 0; y < 1000; y++) {
        let row: number[] = []; 
        for(let x = 0; x < 1000; x++) {
            row.push(0);
        }
        field.push(row);
    }
    for(let i = 0; i < lines.length; i++) {
        if(lines[i][0][0] === lines[i][1][0]) {
            let lower: number = lines[i][0][1] < lines[i][1][1] ? lines[i][0][1] : lines[i][1][1]; 
            let upper: number = lines[i][0][1] < lines[i][1][1] ? lines[i][1][1] : lines[i][0][1];
            for(let y = lower; y <= upper; y++) {
                field[lines[i][0][0]][y]++;
            }
        } else if(lines[i][0][1] === lines[i][1][1]) {
            let lower: number = lines[i][0][0] < lines[i][1][0] ? lines[i][0][0] : lines[i][1][0]; 
            let upper: number = lines[i][0][0] < lines[i][1][0] ? lines[i][1][0] : lines[i][0][0];
            for(let x = lower; x <= upper; x++) {
                field[x][lines[i][0][1]]++;
            }
        } else {
            let lowerX: number = lines[i][0][0] < lines[i][1][0] ? lines[i][0][0] : lines[i][1][0]; 
            let upperX: number = lines[i][0][0] < lines[i][1][0] ? lines[i][1][0] : lines[i][0][0];
            let lowerY: number = lines[i][0][1] < lines[i][1][1] ? lines[i][0][1] : lines[i][1][1]; 
            let y: number = lines[i][0][0] < lines[i][1][0] ? lines[i][0][1] : lines[i][1][1];
            let direction: number = y == lowerY ? 1 : -1; 
            for(let x = lowerX; x <= upperX; x++) {
                field[x][y]++;
                y += direction;
            }
        }
    }
    let counter: number = 0;
    for(let y = 0; y < 1000; y++) {
        for(let x = 0; x < 1000; x++) {
            if(field[x][y] >= 2) {
                counter++;
            }
        }
    }
    return counter;
}
