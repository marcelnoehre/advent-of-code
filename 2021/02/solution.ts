import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
let arr:[string, number] = file.toString().trim().split('\n').map((line) => [line.split(' ')[0], parseInt(line.split(' ')[1], 10)]);
part_1(arr);
part_2(arr);

function part_1(arr:[string, number]) {
    let horizontalPosition = 0;
    let depth = 0;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][0] == 'forward') {
            horizontalPosition += arr[i][1];
        } else if(arr[i][0] == 'down') {
            depth += arr[i][1];
        } else if(arr[i][0] == 'up') {
            depth -= arr[i][1];
        }
    }
    console.log(horizontalPosition * depth);
}

function part_2(arr:[string, number]) {
    let horizontalPosition = 0;
    let depth = 0;
    let aim = 0;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][0] == 'forward') {
            horizontalPosition += arr[i][1];
            depth += aim * arr[i][1];
        } else if(arr[i][0] == 'down') {
            aim += arr[i][1];
        } else if(arr[i][0] == 'up') {
            aim -= arr[i][1];
        }
    }
    console.log(horizontalPosition * depth);
}