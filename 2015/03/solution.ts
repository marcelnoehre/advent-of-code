import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const row:string[]= file.toString().trim().split('');
console.log(part_1(row));
console.log(part_2(row));

function part_1(row: string[]) {
    let position: number[] = [0,0];
    let done: number[][] = [[0,0]];
    let houses: number = 1;
    for(let i = 0; i < row.length; i++) {
        if(row[i] == '^') {
            position[1]++;
        } else if(row[i] == 'v') {
            position[1]--;
        } else if(row[i] == '>') {
            position[0]++;
        } else if(row[i] == '<') {
            position[0]--;
        }
        let check = true;
        for(let j = 0; j < done.length; j++) {
            if(done[j][0] == position[0] && done[j][1] == position[1]) {
                check = false;
                j = done.length;
            }
        }
        if(check) {
            done.push([...[position[0], position[1]]]);
            houses++;
        }
    }
    return houses;
}

function part_2(row: string[]) {
    let santa: number[] = [0,0];
    let robo: number[] = [0,0];
    let done: number[][] = [[0,0]];
    let houses: number = 1;
    for(let i = 0; i < row.length; i++) {
        let check = true;
        if(i%2==1) {
            if(row[i] == '^') {
                santa[1]++;
            } else if(row[i] == 'v') {
                santa[1]--;
            } else if(row[i] == '>') {
                santa[0]++;
            } else if(row[i] == '<') {
                santa[0]--;
            }
            for(let j = 0; j < done.length; j++) {
                if(done[j][0] == santa[0] && done[j][1] == santa[1]) {
                    check = false;
                    j = done.length;
                }
            }
            if(check) {
                done.push([...[santa[0], santa[1]]]);
                houses++;
            }
        } else {
            if(row[i] == '^') {
                robo[1]++;
            } else if(row[i] == 'v') {
                robo[1]--;
            } else if(row[i] == '>') {
                robo[0]++;
            } else if(row[i] == '<') {
                robo[0]--;
            }
            for(let j = 0; j < done.length; j++) {
                if(done[j][0] == robo[0] && done[j][1] == robo[1]) {
                    check = false;
                    j = done.length;
                }
            }
            if(check) {
                done.push([...[robo[0], robo[1]]]);
                houses++;
            }
        }
    }
    return houses;
}