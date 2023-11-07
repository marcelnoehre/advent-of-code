import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().trim().split(', ');
const directions = {
    0: [0, 1],
    1: [1, 0],
    2: [0, -1],
    3: [-1, 0]
};
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    const pos: number[] = [0, 0];
    let direction: number = 0;
    input.forEach((move) => {
        direction = (direction + (move.charAt(0) === 'R' ? 1 : -1) + 4) % 4;
        pos[0] += parseInt(move.substring(1), 10) * directions[direction][0];
        pos[1] += parseInt(move.substring(1), 10) * directions[direction][1];
    });
    return Math.abs(pos[0] + pos[1]);
}

export function part_2(): number {
    let visited: Set<String> = new Set<String>();
    const pos: number[] = [0, 0];
    let direction: number = 0;
    for(const move of input) {
        direction = (direction + (move.charAt(0) === 'R' ? 1 : -1) + 4) % 4;
        const max = parseInt(move.substring(1), 10) * directions[direction][directions[direction][0] === 0 ? 1 : 0];
        for(let i = 0; i < (max < 0 ? max * -1 : max); i++) {
            pos[0] += directions[direction][0];
            pos[1] += directions[direction][1];
            if(visited.has(pos.join(','))) {
                return Math.abs(pos[0] + pos[1]);
            } else {
                visited.add(pos.join(','));
            }
        }
    };
}