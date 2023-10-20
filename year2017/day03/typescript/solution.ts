import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const input:number = Number(file.toString());
console.log(part_1());
console.log(part_2());

function part_1(): number {
    let [steps, x, y] = [ Infinity,
        Math.pow(((Math.floor(Math.sqrt(input - 1) / 2) + 1) * 2 - 1), 2),
        Math.pow(((Math.floor(Math.sqrt(input - 1) / 2) + 1) * 2 + 1), 2)];
    for (let i = 0; i < 4; i++) {
        steps = Math.min(steps, Math.abs(input - ((1 - (i / 4 + 0.125)) * x + (i / 4 + 0.125) * y)));
    }
    return steps + (Math.floor(Math.sqrt(input - 1) / 2) + 1);
}

function part_2(): number {
    const grid: { [key: string]: number } = {};
    for (const [x, y] of generateField()) {
        const value: number = [-1, 0, 1].reduce((sum, i) => {                
            return sum + [-1, 0, 1].reduce((iSum, j) => {
                if (!(i === 0 && j === 0)) iSum += grid[`${x + i},${y + j}`] || 0;
                return iSum;
            }, 0);
        }, 0) || 1;
        if (value > input) return value;
        grid[`${x},${y}`] = value;
    }
}

function* generateField(): Generator<[number, number]> {
    let [x, y, dx, dy, s, i] = [0, 0, 1, 0, 0, 1];
    while (true) {
        yield [x, y];
        [i, x, y] = [i + 1, x + dx, y + dy]
        if (i >= Math.pow((s * 2 + 1), 2)) s += 1;
        if (Math.abs(x + dx) > s || Math.abs(y + dy) > s) [dx, dy] = [dy, -dx];
    }
}
