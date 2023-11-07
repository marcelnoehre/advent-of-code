import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const pattern: RegExp = /Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)/;
const input = file.toString().split('\n').map((line) => line.match(pattern).slice(1, 4)).reduce((acc, line) => (acc[line[0]] = [Number(line[1]), line[2].split(', '), {}], acc), {});;
const sortedRooms: string[] = Object.keys(input).filter(key => input[key][0] !== 0).sort();
sortedRooms.concat(["AA"]).forEach(a => sortedRooms.filter(b => b !== a).forEach(b => input[a][2][b] = search(input[a][1], b)));
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return pressure(29, false);
}

export function part_2(): number {
    return pressure(25, true);
}

function search(start: string[], end: string): number {
    return start.includes(end) ? 1 : 1 + search([...new Set(start.flatMap(room => input[room][1]))], end);
}

function pressure(depth, assistant): number {
    let max: number = 0;
    f(new Set(['AA']), 0, 'AA', depth, false, assistant);
    function f(opened: Set<string>, flowed: number, curr: string, depth: number, elephant: boolean, assistant: boolean): void {
        max = Math.max(max, flowed);
        if (!opened.has(curr)) {
            f(new Set([...opened, curr]), flowed + input[curr][0] * depth, curr, depth - 1, elephant, assistant);
            if (assistant && !elephant) f(new Set([curr, ...opened]), flowed + input[curr][0] * depth, 'AA', 25, true, assistant);
        } else Object.keys(input[curr][2]).filter(x => !opened.has(x)).forEach((room) => f(opened, flowed, room, depth - input[curr][2][room], elephant, assistant));
    }
    return max;
}
