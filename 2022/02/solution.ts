import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr: number[] = file.toString().split('\r\n').map((tupel) => tupel.split(' '));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(list: number[]):number {
    let sum: number = 0;
    list.forEach(tupel => {
        if(tupel[1] == 'X') {
            sum += 1;
            if(tupel[0] == 'A') {
                sum += 3;
            } else if(tupel[0] == 'C') {
                sum += 6;
            }
        } else if(tupel[1] == 'Y') {
            sum += 2;
            if(tupel[0] == 'B') {
                sum += 3;
            } else if(tupel[0] == 'A') {
                sum += 6;
            }
        } else if (tupel[1]== 'Z'){
            sum += 3;
            if(tupel[0] == 'C') {
                sum += 3;
            } else if(tupel[0] == 'B') {
                sum += 6;
            }
        }
    });
    return sum;
}

function part_2(list: number[]):number {
    let sum: number = 0;
    list.forEach(tupel => {
        if(tupel[0] == 'A') {
            if(tupel[1] == 'X') {
                sum += 0 + 3;
            } else if(tupel[1] == 'Y') {
                sum += 3 + 1;
            } else {
                sum += 6 + 2;
            }
        } else if(tupel[0] == 'B') {
            if(tupel[1] == 'X') {
                sum += 0 + 1;
            } else if(tupel[1] == 'Y') {
                sum += 3 + 2;
            } else {
                sum += 6 + 3;
            }
        } else if (tupel[0]== 'C'){
            if(tupel[1] == 'X') {
                sum += 0 + 2;
            } else if(tupel[1] == 'Y') {
                sum += 3 + 3;
            } else {
                sum += 6 + 1;
            }
        }
    });
    return sum;
}