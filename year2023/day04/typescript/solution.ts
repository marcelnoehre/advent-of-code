import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][][] = file.toString().replace(/Card \d+:\s+/g, '').split('\n').map(card => card.split(' | ').map(list => list.split(/\s+/).map(Number)));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((sum, card) => sum + (card[0].filter(num => card[1].includes(num)).length === 0 ? 0 : Math.pow(2, card[0].filter(num => card[1].includes(num)).length - 1)), 0);
}

export function part_2(): number {
  let matches = input.map(card => [card[0].filter(num => card[1].includes(num)).length, 1]);
  matches.forEach((match, i) => matches.slice(i + 1, i + 1 + match[0]).forEach(sub => sub[1] += match[1]));
  return matches.reduce((acc, card) => acc + card[1], 0);
}
