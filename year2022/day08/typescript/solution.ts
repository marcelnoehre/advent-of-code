import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[][] = file.toString().trim().split('\n').map((row) => row.split('').map((num) => parseInt(num, 10)));
const [width, height] = [arr[0].length, arr.length];
const directions: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
console.log(part_1());
console.log(part_2());

function part_1(): number {
    let sum: number = 0;
    for (const [dx, dy] of directions) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let i: number = y + dy;
                let j: number = x + dx;
                while (i >= 0 && i < height && j >= 0 && j < width) {
                    if (arr[i][j] >= arr[y][x]) {
                        break;
                    }
                    i += dy;
                    j += dx;
                }
                if (i < 0 || i >= height || j < 0 || j >= width) {
                    sum++;    
                }
            }
        }
    }
    return sum;
  }

function part_2():number {
    let result: number = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let distance: number = 1;
            for (const [dx, dy] of directions) {
                let i: number = y + dy;
                let j: number = x + dx;
                let sum = 0;
                while (i >= 0 && i < height && j >= 0 && j < width) {
                    sum ++;
                    if (arr[i][j] >= arr[y][x]) {
                        break;
                    }
                    i += dy;
                    j += dx;
                }
                distance *= sum;
            }
            result = Math.max(result, distance);
        }
    }
    return result;
}