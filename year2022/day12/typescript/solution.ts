import { readFileSync } from "fs";

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const directions: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];  
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    let [start, end, chars] = [[0, 0], [0, 0], file.split('\n').map((row) => row.split(''))];
    chars.forEach((row, i) => {
        row.forEach((char, j) => {
            if (char === 'E') [end, chars[i][j]] = [[i, j], 'z'];
            if (char === 'S') [start, chars[i][j]] = [[i, j], 'a'];
        });
    });
    return findShortestPass(chars, start, end, chars.length * chars[0].length);
}

export function part_2(): number {
    let [starts, end, chars] = [[], [0, 0], file.split('\n').map((row) => row.split(''))];
    chars.forEach((row, i) => {
        row.forEach((char, j) => {
            if (char === 'a') starts.push([i, j]);
            if (char === 'E') [end, chars[i][j]] = [[i, j], 'z'];
            if (char === 'S') {
                chars[i][j] = 'a';
                starts.push([i, j]);
            }
        });
    });
    let length: number = chars.length * chars[0].length;
    starts.forEach((start) => {length = findShortestPass(chars, start, end, length)});
    return length;
}

function findShortestPass(chars: string[][], start: number[], end: number[], length: number): number {
    let seen = chars.map((row) => row.map(() => false));
    const Q = [[start[0], start[1], 0]];
    while (Q.length > 0) {
        const curr = Q.shift();
        for (let direction of directions) {
            const [dx, dy] = [curr[0] + direction[0], curr[1] + direction[1]];
            if (dx < 0 || dy < 0 || dx >= chars.length || dy >= chars[0].length) continue;
            if (seen[dx][dy] || chars[dx][dy].charCodeAt(0) - chars[curr[0]][curr[1]].charCodeAt(0) > 1) continue;
            if (dx === end[0] && dy === end[1]) length = curr[2] + 1 < length ? curr[2] + 1 : length;
            seen[dx][dy] = true;
            Q.push([dx, dy, curr[2] + 1]);
        }
    }
    return length;
}