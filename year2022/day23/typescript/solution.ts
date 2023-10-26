import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
let [elves, directions] = [new Set(), ['N', 'S', 'W', 'E']];
console.log(part_1());
console.log(part_2());

function part_1(): number {
    file.toString().split('\n').map((row, y) => row.split('').map((dir, x) => {if (dir === '#') elves.add(`${x},${y}`)}));
    [...Array(10)].map(round);
    const keys = [...elves.keys()].map((key: string) => key.split(','));
    const [xs, ys] = [keys.map(key => +key[0]).sort((a, b) => b - a), keys.map(key => +key[1]).sort((a, b) => b - a)]
    return (xs.at(0) - xs.at(-1) + 1) * (ys.at(0) - ys.at(-1) + 1) - elves.size;
}

function part_2(): number {
    [elves, directions] = [new Set(), ['N', 'S', 'W', 'E']];
    file.toString().split('\n').map((row, y) => row.split('').map((dir, x) => {if (dir === '#') elves.add(`${x},${y}`)}));
    let i = 1; for (i; round() > 0; i++); return i;
}

function direction(check, key) {
    const [x, y] = key.split(',').map(n => +n);
    if (check === 'N') return [x, x - 1, x + 1].map(x => `${x},${y - 1}`);
    if (check === 'S') return [x, x - 1, x + 1].map(x => `${x},${y + 1}`);
    if (check === 'W') return [y, y - 1, y + 1].map(y => `${x - 1},${y}`);
    if (check === 'E') return [y, y - 1, y + 1].map(y => `${x + 1},${y}`);
}

function move(elves, proposals): number {
    for (const key of proposals.keys()) {
        if (proposals.get(key).length === 1) {
            elves.delete(proposals.get(key)[0]);
            elves.add(key);
        }
    }
    return Array.from(proposals.keys()).filter(key => proposals.get(key).length === 1).length;
}

function round(): number {
    const moves = new Map();
    for (const key of elves.keys()) {
        if (directions.flatMap(check => direction(check, key)).every(opt => !elves.has(opt))) continue;
        for (const check of directions) {
            if (direction(check, key).every(opt => !elves.has(opt))) {
                moves.set(direction(check, key)[0], (moves.get(direction(check, key)[0]) || []).concat(key));
                break;
            }
        }
    }
    directions.push(directions.shift());
    return move(elves, moves);
}
