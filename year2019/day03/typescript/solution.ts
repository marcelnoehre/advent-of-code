import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:string[][] = file.toString().trim().split('\n').map((line) => line.split(','));
const directions = {
    'L': [-1, 0],    
    'R': [1, 0],
    'U': [0, 1],
    'D': [0, -1]
}
const [wire1, wire2] = [decodeWire(arr[0]), decodeWire(arr[1])];
const panel: number[][] = wire1.filter(x => wire2.some(y => x[0] === y[0] && x[1] === y[1]));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return Math.min(...panel.map(([x, y]) => Math.abs(x) + Math.abs(y)));
}

function part_2(): number {
    return Math.min(...panel.map(([x, y]) => 
        wire1.findIndex(([a, b]) => a === x && b === y) 
        + wire2.findIndex(([a, b]) => a === x && b === y))
    ) + 2;
}

function decodeWire(wire: string[]) {
    const visited: [number, number][] = [];
    let [x, y] = [0, 0];
    wire.forEach((cmd) => {
        for(let i = 0; i < Number(cmd.substring(1)); i++) {
            x += directions[cmd.charAt(0)][0];
            y += directions[cmd.charAt(0)][1];
            visited.push([x, y]);
        }
    });
    return visited;
}