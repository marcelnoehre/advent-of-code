import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: string[] = file.toString().split('\n\n');
const initalStacks: string[][] = setupStacks(arr[0].toString().split('\n').slice(0, -1).reverse());
const instructions: number[][] = arr[1].toString().split('\n').map((row) => row.split(' ').map((element) => parseInt(element)));
console.log(part_1());
console.log(part_2());

function part_1(): string {
    let stacks: string[][] = initalStacks.map(stack => [...stack]);
    instructions.forEach(move => {
        stacks[move[5]-1].push(...stacks[move[3]-1].splice(stacks[move[3]-1].length - move[1], move[1]).reverse());
    });
    return stacks.map((_, i) => stacks[i].pop()).join('');
}

function part_2(): string {
    let stacks: string[][] = initalStacks.map(stack => [...stack]);
    instructions.forEach(move => {
        stacks[move[5] - 1].push(...stacks[move[3] - 1].splice(-move[1]));
      });
    return stacks.map((_, i) => stacks[i].pop()).join('');
}

function setupStacks(input: string[]) {
    let build: string[][] = [...Array(9)].map(() => []);
    for(let i = 1; i < input[0].length; i += 4) {
        input.forEach(stack => {
            if(/[A-Z]/.test(stack.charAt(i))) {
                build[Math.floor(i / 4)].push(stack.charAt(i));
            }
        });
    }
    return build;
}