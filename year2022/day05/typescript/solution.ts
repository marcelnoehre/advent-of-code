import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n\n');
const initalStacks: string[][] = setupStacks(input[0].toString().split('\n').slice(0, -1).reverse());
const instructions: number[][] = input[1].toString().split('\n').map((row) => row.split(' ').map(Number));
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): string {
    let stacks: string[][] = initalStacks.map(stack => [...stack]);
    instructions.forEach(move => {
        stacks[move[5]-1].push(...stacks[move[3]-1].splice(stacks[move[3]-1].length - move[1], move[1]).reverse());
    });
    return stacks.map((_, i) => stacks[i].pop()).join('');
}

export function part_2(): string {
    let stacks: string[][] = initalStacks.map(stack => [...stack]);
    instructions.forEach(move => {
        stacks[move[5] - 1].push(...stacks[move[3] - 1].splice(-move[1]));
      });
    return stacks.map((_, i) => stacks[i].pop()).join('');
}

function setupStacks(arr: string[]) {
    let build: string[][] = [...Array(9)].map(() => []);
    for(let i = 1; i < arr[0].length; i += 4) {
        arr.forEach(stack => {
            if(/[A-Z]/.test(stack.charAt(i))) {
                build[Math.floor(i / 4)].push(stack.charAt(i));
            }
        });
    }
    return build;
}