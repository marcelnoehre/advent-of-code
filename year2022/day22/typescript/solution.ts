import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input = file.toString().split('\n\n');
const squares: any[] = [
    { x: 50, y: 0, wrap: [null, null, [4, 0], [5, 0]] },
    { x: 100, y: 0, wrap: [[3, 2], [2, 2], null, [5, 3]] },
    { x: 50, y: 50, wrap: [[1, 3], null, [4, 1], null] },
    { x: 50, y: 100, wrap: [[1, 2], [5, 2], null, null] },
    { x: 0, y: 100, wrap: [null, null, [0, 0], [2, 0]] },
    { x: 0, y: 150, wrap: [[3, 3], [1, 1], [0, 1], null] },
];
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return password(wrap2D);
}

export function part_2(): number {
    return password(wrap3D(50));
}
  
function wrap2D(maze: string[][], pos: number[]): number[] {
    const [opp, wrap] = [[[1, 0], [0, 1], [-1, 0], [0, -1]][pos[2] % 4].map(val => -val), [...pos]];
    while(['.', '#'].includes(maze[wrap[1] + opp[1]]?.[wrap[0] + opp[0]])) [wrap[0], wrap[1]] = [wrap[0] + opp[0], wrap[1] + opp[1]];
    return wrap;
}
  
function wrap3D(width: number) {
    return function (maze: string[][], pos: number[]): number[] {
        let [[i, dir], nxt] = [squares.find((sq) => sq.x === pos[0] - pos[0] % width && sq.y === pos[1] - pos[1] % width)!.wrap[pos[2]], []];
        if (['02', '11', '33'].includes([pos[2], dir].sort().join(''))) nxt = [pos[0] % width, width - pos[1] % width - 1];
        if (['00', '13', '22'].includes([pos[2], dir].sort().join(''))) nxt = [width - pos[0] % width - 1, pos[1] % width];
        if (['03', '12'].includes([pos[2], dir].sort().join(''))) nxt = [pos[1] % width, pos[0] % width];
        if (['01', '23'].includes([pos[2], dir].sort().join(''))) nxt = [width - pos[1] % width - 1, width - pos[0] % width - 1];
        return [squares[i].x + nxt[0], squares[i].y + nxt[1], dir];
    };
}
  
function walk(maze: string[][], pos: number[], steps: number, wrapLogic: Function): number[] {
    for (; steps > 0; steps--) {
        let next = [pos[0] + [[1, 0], [0, 1], [-1, 0], [0, -1]][pos[2] % 4][0], pos[1] + [[1, 0], [0, 1], [-1, 0], [0, -1]][pos[2] % 4][1], pos[2]];
        if (maze[next[1]]?.[next[0]] !== '.' && maze[next[1]]?.[next[0]] !== '#') next = wrapLogic(maze, pos);
        if (maze[next[1]][next[0]] === '#') break;
        pos = next;
    }
    return pos;
}

function password(wrapLogic): number {
    let [pos, maze, directions] = [[0, 0, 0], input[0].split('\n').map(row => row.split('')), input[1].replace(/(R|L)/g, ',$1,').split(',')];
    while(maze[pos[1]][pos[0]] != '.') pos[0]++;
    while(directions.length > 0) {
        const dir = directions.shift()!;
        pos = Number.isInteger(+dir) ? walk(maze, pos, +dir, wrapLogic) : [pos[0], pos[1], dir === 'R' ? (pos[2] + 1) % 4 : (4 + pos[2] - 1) % 4];
    }
    return(pos[1] + 1) * 1000 + (pos[0] + 1) * 4 + pos[2];
}
