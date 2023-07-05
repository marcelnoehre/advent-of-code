import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: any[][] = file.toString().split('\n').map((row) => row.split(' '));
let stages: number[] = [20,60,100,140,180,220];
console.log(part_1());
console.log(part_2());

function part_1(): number {
    let cycle: number = 0;
    let sum: number = 0;
    let x: number = 1;
    arr.forEach(instruction => {
        cycle++;
        if(stages.includes(cycle)) {
            sum += cycle * x;
        }
        if(instruction.length === 2) {
            cycle++;
            if(stages.includes(cycle)) {
                sum += cycle * x;
            }
            x += parseInt(instruction[1], 10);
        }
    });
    return sum;
}

function part_2(): string {
    stages = stages.map((num) => num + 20);
    let sprite: number[] = [0, 1, 2];
    let cycle: number = 1;
    let row: string = '';
    let x: number = 1;
    arr.forEach(instruction => {
        if(stages.includes(cycle - 1)) {
            row += '\n';
        }
        row += sprite.includes((cycle - 1) % 40) ? '#' : '.';
        cycle++;
        if(instruction.length === 2) {
            if(stages.includes(cycle - 1)) {
                row += '\n';
            }
            row += sprite.includes((cycle - 1) % 40) ? '#' : '.';
            x += parseInt(instruction[1], 10);
            sprite = [x - 1, x, x + 1];
            cycle++;
        }
    });
    return row;
}