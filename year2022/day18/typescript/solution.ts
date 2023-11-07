import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().split('\n').map((row) => row.split(',').map(Number));
const neighbors: number[][] = [[0, 0, 1],[0, 0, -1],[0, 1, 0],[0, -1, 0],[1, 0, 0],[-1, 0, 0]];
const Pts: Set<string> = new Set([...input].map(String));
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return input.reduce((exposedSides, point) => exposedSides + neighbors.filter(delta => !input.some(p => p.every((coord, index) => coord === point[index] + delta[index]))).length, 0);
}

export function part_2(): number {
    return input.reduce((result, [x, y, z]) => result + neighbors.filter(([dx, dy, dz]) => outside(x + dx, y + dy, z + dz)).length, 0);
}

function outside(x: number, y: number, z: number): boolean {
    const [seen, queue] = [new Set(), [[x, y, z]]];
    while (queue.length > 0) {
        const [x, y, z] = queue.shift()!;
        if (seen.has(String([x, y, z])) || Pts.has(String([x, y, z]))) continue;
        seen.add(String([x, y, z]));
        if (seen.size > 4000) return true;
        for (const [dx, dy, dz] of neighbors) queue.push([x + dx, y + dy, z + dz]);
    }
    return false;
}
