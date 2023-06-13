import { readFileSync } from 'fs';

const file: any = readFileSync('../puzzle.txt', 'utf-8');
const arr: string[][] = file.toString().split('\n').map((instruction) => instruction.replace('\r','').split(' '));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    const lights: number[][] = Array.from({ length: 1000 }, () => new Array(1000).fill(0));
    arr.forEach((instruction) => {
        const toggle: number = instruction[0] === 'toggle' ? -1 : 0;
        toggleLights(lights,
            instruction[2 + toggle].split(',').map(num => parseInt(num, 10)), 
            instruction[4 + toggle].split(',').map(num => parseInt(num, 10)),
            toggle === -1 ? toggle : instruction[1] === 'on' ? 1 : 0, true);
    });
    return lights.flatMap(row => row.filter(light => light === 1)).length;
}

function part_2(): number {
    const lights: number[][] = Array.from({ length: 1000 }, () => new Array(1000).fill(0));
    arr.forEach((instruction) => {
        const toggle: number = instruction[0] === 'toggle' ? 0 : 1;
        toggleLights(lights,
            instruction[1 + toggle].split(',').map(num => parseInt(num, 10)),
            instruction[3 + toggle].split(',').map(num => parseInt(num, 10)),
            toggle === 0 ? toggle : instruction[1] === 'on' ? 1 : -1, false);
    });
    return lights.reduce((acc, row) => acc + row.reduce((sum, brightness) => sum + brightness, 0), 0);
}

function toggleLights(array: number[][], start: number[], end: number[], newState: number, first: boolean): void {
    for(let x = start[0]; x <= end[0]; x++) {
        for(let y = start[1]; y <= end[1]; y++) {
            if(first) {
                array[x][y] = newState === -1 ? (array[x][y] + 1) % 2 : newState;
            } else {
                array[x][y] += newState === 0 ? 2 : array[x][y] + newState < 0 ? 0 : newState;
            }
        }
    }
}