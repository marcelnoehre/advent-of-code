import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().split('\n').map((claim) => claim.match(/\d+/g)!.map(Number));
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    let [fabric, overlaps] = [Array.from({ length: 1000 }, () => Array(1000).fill(0)), 0];
    input.forEach(([_, x, y, w, h]) => {
        for (let i = x; i < x + w; i++) {
            for (let j = y; j < y + h; j++) {
                if (fabric[i][j]++ === 1) overlaps++;
            }
        }
    });
    return overlaps;
}

export function part_2(): number {
    let [fabric, noOverlap] = [Array.from({ length: 1000 }, () => Array(1000).fill(0)), new Set<number>()];
    for (const [id, x, y, w, h] of input) {
        noOverlap.add(id);
        for (let i = x; i < x + w; i++) {
            for (let j = y; j < y + h; j++) {
                fabric[i][j] === 0 ? fabric[i][j] = id : (noOverlap.delete(id), noOverlap.delete(fabric[i][j]));
            }
        }
    }
    return Number(Array.from(noOverlap).join(','));
}
