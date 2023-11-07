import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().trim().split('\n');
const directions = {
    'L': [-1, 0],    
    'R': [1, 0],
    'U': [0, 1],
    'D': [0, -1]
}
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): string {
    let [password, x, y] = ['', 1, 1];
    const keypad: number[][] = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]
    ];
    input.forEach((sequenz) => {
        sequenz.split('').forEach((move) => {
            x = Math.min(Math.max(x + directions[move][0], 0), 2);
            y = Math.min(Math.max(y + directions[move][1], 0), 2);
        });
        password += keypad[x][y];
    });
    return password;
}
export function part_2(): string {
    let [password, x, y] = ['', 1, 3];
    const keypad: string[][] = [
        [null, null, null, null, null, null, null],
        [null, null, null, '5', null, null, null],
        [null, null, 'A', '6', '2', null, null],
        [null, 'D', 'B', '7', '3', '1', null],
        [null, null, 'C', '8', '4', null, null],
        [null, null, null, '9', null, null, null],
        [null, null, null, null, null, null, null]
    ];
    input.forEach((sequenz) => {
        sequenz.split('').forEach((move) => {
            if(keypad[x + directions[move][0]][y + directions[move][1]] !== null) {
                x += directions[move][0];
                y += directions[move][1];
            }
        });
        password += keypad[x][y];
    });
    return password;
}