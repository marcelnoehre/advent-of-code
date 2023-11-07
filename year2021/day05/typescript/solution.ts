import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][][] = file.toString().trim().split('\n').map((row) => row.split(' -> ').map((side) => side.split(',').map(Number)));
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    let [seen, duplicated] = [new Set<string>(), new Set<string>()];
    for (const row of input) {
        if (!(row[0][0] !== row[1][0] && row[0][1] !== row[1][1])) {
            [seen, duplicated] = checkRow(iterate(row), seen, duplicated);
        }
    };
    return duplicated.size;
}

export function part_2(): number {
    let [seen, duplicated] = [new Set<string>(), new Set<string>()];
    for (const row of input) {
        [seen, duplicated] = checkRow(iterate(row), seen, duplicated);
    }
    return duplicated.size;
}

function checkRow(iterator: Generator<[number, number]>, seen: Set<string>, duplicated: Set<string>): [Set<string>, Set<string>] {
    let iteration: IteratorResult<[number, number]> = iterator.next();
    while(!iteration.done) {
        const [x, y] = iteration.value;
        const coordinate = `${x},${y}`;
        if (seen.has(coordinate)) {
            duplicated.add(coordinate);
        }
        seen.add(coordinate);
        iteration = iterator.next();
    }
    return [seen, duplicated];
}

function* iterate(row: number[][], ): Generator<[number, number]> {
    const [dx, dy] = [Math.sign(row[1][0] - row[0][0]), Math.sign(row[1][1] - row[0][1])];
    let [x, y] = [row[0][0], row[0][1]];
    yield [x, y];
    while (x !== row[1][0] || y !== row[1][1]) {
        if (x !== row[1][0]) {
            x += dx;
        }
        if (y !== row[1][1]) {
            y += dy;
        }
        yield [x, y];
    }
}