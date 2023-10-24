import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const pattern = /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./;
const arr: number[][] = file.toString().split('\n').map((bp) => bp.match(pattern).slice(1, 8).map(Number));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return arr.reduce((sum, bp, i) => sum + (i + 1) * simulateBp(bp[1], bp[2], bp[3], bp[4], bp[5], bp[6], 24), 0);
}

function part_2(): number {
    return arr.slice(0, 3).reduce((prod, bp) => prod * simulateBp(bp[1], bp[2], bp[3], bp[4], bp[5], bp[6], 32), 1);
}

function simulateBp(Co: number, Cc: number, Co1: number, Co2: number, Cg1: number, Cg2: number, T: number): number {
    const [queue, visited] = [[[0, 0, 0, 0, 1, 0, 0, 0, T]], new Set()]
    let best = 0;
    while(queue.length >0) {
        let state = queue.shift();
        let [o, c, ob, g, r1, r2, r3, r4, t] = state;
        best = Math.max(best, g);
        if (t == 0) continue;
        const cccc = Math.max(Co, Cc, Co1, Cg1);
        if (r1 >= cccc) r1 = cccc;
        if (r2 >= Co2) r2 = Co2;
        if (r3 >= Cg2) r3 = Cg2;
        if (o >= t * cccc - r1 * (t - 1)) o = t * cccc - r1 * (t - 1);
        if (c >= t * Co2 - r2 * (t - 1)) c = t * Co2 - r2 * (t - 1);
        if (ob >= t * Cg2 - r3 * (t - 1)) ob = t * Cg2 - r3 * (t - 1);
        if (visited.has(String([o, c, ob, g, r1, r2, r3, r4, t]))) continue;
        visited.add(String([o, c, ob, g, r1, r2, r3, r4, t]));
        queue.push([o + r1, c + r2, ob + r3, g + r4, r1, r2, r3, r4, t - 1]);
        if (o >= Co) queue.push([o - Co + r1, c + r2, ob + r3, g + r4, r1 + 1, r2, r3, r4, t - 1]);
        if (o >= Cc) queue.push([o - Cc + r1, c + r2, ob + r3, g + r4, r1, r2 + 1, r3, r4, t - 1]);
        if (o >= Co1 && c >= Co2) queue.push([o - Co1 + r1, c - Co2 + r2, ob + r3, g + r4, r1, r2, r3 + 1, r4, t - 1]);
        if (o >= Cg1 && ob >= Cg2) queue.push([o - Cg1 + r1, c + r2, ob - Cg2 + r3, g + r4, r1, r2, r3, r4 + 1,t - 1]);
    }
    return best;
}
