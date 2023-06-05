import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: string[][] = file.toString().trim().split('\r\n').map((pair) => pair.split(' '));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(list: string[][]):number {
    let tailPositions: Set<number[]> = new Set([[0,0]]);
    let head: number[] = [0,0];
    let tail: number[] = [0,0];
    list.forEach(pair => {
        for(let i = 0; i < parseInt(pair[1]); i++) {
            if(pair[0] == 'U') {
                head[1]++;
            } else if(pair[0] == 'D') {
                head[1]--;
            } else if(pair[0] == 'L') {
                head[0]--;
            } else if(pair[0] == 'R') {
                head[0]++;
            }
            if(Math.max(Math.abs(tail[0]-head[0]),Math.abs(tail[1]-head[1])) > 1) {
                tail = [Math.abs(head[0]-tail[0]) === 2 ? (tail[0]+(head[0]-tail[0])/2) : (tail[0]+(head[0]-tail[0])), Math.abs(head[1]-tail[1]) === 2 ? (tail[1]+(head[1]-tail[1])/2) : (tail[1]+(head[1]-tail[1]))]; 
                let check:boolean = true;
                tailPositions.forEach(pos => {
                    if(pos[0] === tail[0] && pos[1] === tail[1]) {
                        check = false;
                    }
                });            
                if(check) {
                    tailPositions.add(tail);
                }
            }
        }
    });
    return tailPositions.size;
}

function part_2(list: string[][]):number {
    let tailPositions: Set<number[]> = new Set([[0,0]]);
    let head: number[] = [0,0];
    let tail: number[][] = [];
    for(let i = 0; i < 9; i++) {
        tail.push([0,0]);
    }
    list.forEach(pair => {
        for(let i = 0; i < parseInt(pair[1]); i++) {
            if(pair[0] == 'U') {
                head[1]++;
            } else if(pair[0] == 'D') {
                head[1]--;
            } else if(pair[0] == 'L') {
                head[0]--;
            } else if(pair[0] == 'R') {
                head[0]++;
            }
            for(let j = 0; j < 9; j++) {
                let reference: number[] = j === 0 ? head : tail[j-1];
                if(Math.max(Math.abs(tail[j][0]-reference[0]),Math.abs(tail[j][1]-reference[1])) > 1) {
                    tail[j] = [Math.abs(reference[0]-tail[j][0]) === 2 ? (tail[j][0]+(reference[0]-tail[j][0])/2) : (tail[j][0]+(reference[0]-tail[j][0])), Math.abs(reference[1]-tail[j][1]) === 2 ? (tail[j][1]+(reference[1]-tail[j][1])/2) : (tail[j][1]+(reference[1]-tail[j][1]))]; 
                }
            }
            let check:boolean = true;
            tailPositions.forEach(pos => {
                if(pos[0] === tail[8][0] && pos[1] === tail[8][1]) {
                    check = false;
                }
            });            
            if(check) {
                tailPositions.add(tail[8]);
            }
        }
    });
    return tailPositions.size;
}
