import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr:string[] = file.toString().trim().split('\r\n');
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(information: string[]): number {
    let x: number = 0;
    let y: number = 0;
    let password: string = '';
    let buttons: number[][] = [[1,2,3],[4,5,6],[7,8,9]];
    for(let i = 0; i < information.length; i++) {
        for(let j = 0; j < information[i].length; j++) {
            if(information[i][j] == 'L' && x > 0) {
                x--;
            } else if(information[i][j] == 'R' && x < 2) {
                x++;
            } else if(information[i][j] == 'U' && y > 0) {
                y--;
            } else if(information[i][j] == 'D' && y < 2) {
                y++;
            }
        }
        password += buttons[y][x];
    }
    return parseInt(password, 10);
}
function part_2(information: string[]): string {
    let x: number = 0;
    let y: number = 2;
    let password: string = '';
    let buttons: string[][] = [[null,null,'1',null,null],[null,'2','3','4',null],['5','6','7','8','9'],[null,'A','B','C',null],[null,null,'D',null,null]];
    for(let i = 0; i < information.length; i++) {
        for(let j = 0; j < information[i].length; j++) {
            //TODO: handle new lock field
            if(information[i][j] == 'L' && x > 0 && buttons[y][x-1] != null) {
                x--;
            } else if(information[i][j] == 'R' && x < 4 && buttons[y][x+1] != null) {
                x++;
            } else if(information[i][j] == 'U' && y > 0 && buttons[y-1][x] != null) {
                y--;
            } else if(information[i][j] == 'D' && y < 4 && buttons[y+1][x] != null) {
                y++;
            }
        }
        password += buttons[y][x];
    }
    return password;
}