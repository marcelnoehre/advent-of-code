import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const [rocks, top] = setupRocks(file.toString().split('\n').map((row) => row.split(' -> ').map((pair) => pair.split(',').map(Number))));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    let [sand, xy]: [Set<string>, [number, number] | null] = [new Set(), null];
    while ((xy = simulate(500, 0, (x, y) => !Array.from(rocks).some(pt => pt[0] === x && pt[1] === y) && !sand.has(`${x},${y}`), top)) !== null) {
        sand.add(`${xy[0]},${xy[1]}`);
    }
    return sand.size;
}

function part_2(): number {
    const sand: Set<string> = new Set();
    while (!sand.has('500,0')) {
        sand.add(`${simulate(500, 0, (x, y) => y < top + 2 && !Array.from(rocks).some(point => point[0] === x && point[1] === y) && !sand.has(`${x},${y}`), top + 2).join(',')}`);
    }
    return sand.size;
}

function setupRocks(arr: number[][]):  [Set<[number, number]>, number] {
    let [rocks, max] = [new Set<[number, number]>(), 0];    
    arr.forEach((structure) => {
        for(let i = 0; i < structure.length - 1; i++) {
            if(structure[i][0] === structure[i+1][0]) {
                for (let y = Math.min(structure[i][1], structure[i+1][1]); y <= Math.max(structure[i][1], structure[i+1][1]); y++) {
                    rocks.add([structure[i][0], y]);
                }
            } else if (structure[i][1] === structure[i+1][1]) {
                for (let x = Math.min(structure[i][0], structure[i+1][0]); x <= Math.max(structure[i][0], structure[i+1][0]); x++) {
                    rocks.add([x, structure[i+1][1]]);
                }
                max = Math.max(structure[i+1][1], max);
            }
        }
    });
    return [rocks, max];
}

function simulate(x: number, y: number, air: (x, y) => boolean, top: number): [number, number] | null {
    while (y <= top) {
        if (air(x, y + 1)) {
            y += 1;
        } else if (air(x - 1, y + 1)) {
            [x, y] = [x - 1, y + 1];
        } else if (air(x + 1, y + 1)) {
            [x, y] = [x + 1, y + 1];
        } else {
            return [x, y];
        }
    }
    return null;
}