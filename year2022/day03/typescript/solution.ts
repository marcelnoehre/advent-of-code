import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: string[] = file.toString().trim().split('\n');
console.log(part_1());
console.log(part_2());

function part_1(): number {
    let sum: number = 0;
    arr.forEach(rucksack => {
      const compartments: string[] = rucksack.match(new RegExp(`.{1,${Math.floor(rucksack.length / 2)}}`, 'g'))!;
      sum += getCharValue(compartments[0].split('').find((c) => compartments[1].includes(c))!);
    });
    return sum;
}

function part_2(): number {
    let groups: string[][] = [];
    for (let i = 0; i < arr.length; i += 3) {
      groups.push(arr.slice(i, i + 3));
    }
    return groups.map((group) => {
        return getCharValue(group[0].split('').find((c) => group[1].includes(c) && group[2].includes(c))!);
    }).reduce((a, b) => a + b, 0);
}

function getCharValue(c: string): number {
    return c.charCodeAt(0) - (c.charCodeAt(0) > 96 ? 96 : 38);
}