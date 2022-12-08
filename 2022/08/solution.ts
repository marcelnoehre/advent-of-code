import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr: number[][] = file.toString().trim().split('\r\n').map((row) => row.split('').map((num) => parseInt(num, 10)));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(board: number[][]):number {
    let sum: number = 0;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(i === 0 || j === 0 || i === board.length-1 || j === board[i].length-1) {
                sum++;
            } else {
                let up: boolean = true;
                let down: boolean = true;
                let left: boolean = true;
                let right: boolean = true;
                for(let x = 0; x < board.length; x++) {
                    if(board[i][j] <= board[i][x]) {
                        if(x < j) {
                            up = false;
                        } else if(x > j) {
                            down = false;
                        }
                    }
                }
                if(!up && !down) {
                    for(let x = 0; x < board[i].length; x++) {
                        if(board[i][j] <= board[x][j]) {
                            if(x < i) {
                                left = false;
                            } else if(x > i) {
                                right = false;
                            }
                        }
                    }
                }
                if(up || down || left || right) {
                    sum++;
                }
            }
        }
    }
    return sum;
}

function part_2(board: number[][]):number {
    let result: number = 0;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            board[i][j]
            let up = 0;
            for(let x = i-1; x >= 0; x--) {
                up++;
                if(board[x][j] >= board[i][j]) {
                    x = -1;
                }
            }
            let down = 0;
            for(let x = i+1; x < board.length; x++) {
                down++;
                if(board[x][j] >= board[i][j]) {
                    x = board.length;
                }
            }
            let left = 0;
            for(let x = j-1; x >= 0; x--) {
                left++;
                if(board[i][x] >= board[i][j]) {
                    x = -1;
                }
            }
            let right = 0;
            for(let x = j+1; x < board[i].length; x++) {
                right++;
                if(board[i][x] >= board[i][j]) {
                    x = board[i].length;
                }
            }
            result = (up*down*left*right) > result? (up*down*left*right) : result; 
        }
    }
    return result;
}
