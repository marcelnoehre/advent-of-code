import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const presents:number[][] = file.toString().trim().split('\n').map((present) => present.split('x').map((value) => parseInt(value, 10)));
console.log(part_1(presents));
console.log(part_2(presents));

function part_1(presents: number[][]): number {
    let sum: number = 0;
    for(let i = 0; i < presents.length; i++) {
        let smallest: number = presents[i][2]*presents[i][0];
        for(let j = 0; j < 2; j++) {
            smallest = presents[i][j]*presents[i][j+1] < smallest? presents[i][j]*presents[i][j+1] : smallest;
        }
        sum += 2*presents[i][0]*presents[i][1] + 2*presents[i][1]*presents[i][2] + 2*presents[i][2]*presents[i][0] + smallest;
    }
    return sum;
}

function part_2(presents: number[][]): number {
    let sum: number = 0;
    for(let i = 0; i < presents.length; i++) {
        let sides: number[] = [presents[i][0] <= presents[i][1]? presents[i][0] : presents[i][1], presents[i][0] <= presents[i][1]? presents[i][1] : presents[i][0]]
        sides[1] = presents[i][2] < sides[1]? presents[i][2] : sides[1]
        sum += presents[i][0]*presents[i][1]*presents[i][2] + (sides[0]+sides[1])*2;
    }
    return sum;
}