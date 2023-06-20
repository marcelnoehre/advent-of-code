import { readFileSync } from 'fs';

const file: any = readFileSync('../puzzle.txt', 'utf-8');
const arr: string[][] = file.toString().split('\r\n\r\n').map((row) => row.split('\r\n'));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return simulate(20, setupMonkeys(arr), true);
}

function part_2(): number {
    return simulate(10000, setupMonkeys(arr), false);
}

function simulate(rounds: number, monkeys: [number[], string, number, number, number][], trust: boolean): number {
    const mod: number = monkeys.reduce((acc, curr) => acc * curr[2], 1);
    const monkeyMap: Map<number, number> = new Map(Array.from({ length: monkeys.length }, (_, i) => [i, 0]));
    for(let i = 0; i < rounds; i++) {
        for(let j = 0; j < monkeys.length; j++) {
            while(monkeys[j][0].length > 0) {
                monkeyMap.set(j, monkeyMap.get(j) + 1);
                const item = monkeys[j][0].shift();
                let newValue: number = new Function(`return ${monkeys[j][1].replace('old', String(item)).replace('old', String(item))}`)();
                newValue = trust ? Math.floor(newValue / 3) % mod : newValue % mod;
                monkeys[monkeys[j][newValue % monkeys[j][2] === 0 ? 3 : 4]][0].push(newValue);
            };
        };
    }
    return Array.from(monkeyMap.values()).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b);
}

function setupMonkeys(input: string[][]): [number[], string, number, number, number][] {
  return input.map((monkey) => [
    monkey[1].replace('Starting items:', '').trim().split(', ').map(Number),
    monkey[2].replace('Operation: new =', '').trim(),
    Number(monkey[3].replace('Test: divisible by', '').trim()),
    Number(monkey[4].replace('If true: throw to monkey', '').trim()),
    Number(monkey[5].replace('If false: throw to monkey', '').trim())
  ]);
}