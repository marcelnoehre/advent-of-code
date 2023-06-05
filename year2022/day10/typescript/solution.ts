import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: any[][] = file.toString().split('\r\n').map((row) => row.split(' '));
console.log(part_1(arr));
part_2(arr);

function part_1(list: any[][]):number {
    let stages: number[] = [20,60,100,140,180,220];
    let cycle: number = 0;
    let sum: number = 0;
    let x: number = 1;
    list.forEach(instruction => {
        cycle++;
        if(stages.includes(cycle)) {
            sum += cycle*x;
        }
        if(instruction.length == 2) {
            cycle++;
            if(stages.includes(cycle)) {
                sum += cycle*x;
            }
            x += parseInt(instruction[1],10);
        }
    });
    return sum;
}

function part_2(list: any[]): void {
    let stages: number[] = [40,80,120,160,200,240];
    let cycle: number = 1;
    let sprite: number[] = [0,1,2];
    let x: number = 1;
    let row: string = '';
    list.forEach(instruction => {
        if(stages.includes(cycle-1)) {
            console.log(row);
            row = '';
        }
        row += sprite.includes((cycle-1) % 40) ? '#' : '.'
        cycle++;
        if(instruction.length == 2) {
            if(stages.includes(cycle-1)) {
                console.log(row);
                row = '';
            }
            row += sprite.includes((cycle-1) % 40) ? '#' : '.'
            x += parseInt(instruction[1],10);
            sprite = [x-1, x, x+1];
            cycle++;
        }
    });
    console.log(row);
}