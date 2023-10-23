import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:string[][] = file.toString().split('\n').map((claim) => claim.match(/\d+/g)!.map(Number));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    let [fabric, overlaps] = [Array.from({ length: 1000 }, () => Array(1000).fill(0)), 0];
    arr.forEach(([_, x, y, w, h]) => {
        for (let i = Number(x); i < Number(x + w); i++) {
            for (let j = Number(y); j < Number(y + h); j++) {
                if (fabric[i][j]++ === 1) overlaps++;
            }
        }
    });
    return overlaps;
}

function part_2(): number {
    let [fabric, noOverlap] = [Array.from({ length: 1000 }, () => Array(1000).fill(0)), new Set<number>()];
    for (const [id, x, y, w, h] of arr) {
        noOverlap.add(Number(id));
        for (let i = Number(x); i < Number(x + w); i++) {
            for (let j = Number(y); j < Number(y + h); j++) {
                fabric[i][j] === 0 ? fabric[i][j] = Number(id) : (noOverlap.delete(Number(id)), noOverlap.delete(fabric[i][j]));
            }
        }
    }
    return Number(Array.from(noOverlap).join(','));
}
