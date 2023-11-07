import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().trim().split('\n').map((row) => row.split('').map(Number));
const [width, height] = [input[0].length, input.length];
const directions: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    let sum: number = 0;
    for (const [dx, dy] of directions) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let i: number = y + dy;
                let j: number = x + dx;
                while (i >= 0 && i < height && j >= 0 && j < width) {
                    if (input[i][j] >= input[y][x]) {
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

export function part_2():number {
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
                    if (input[i][j] >= input[y][x]) {
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