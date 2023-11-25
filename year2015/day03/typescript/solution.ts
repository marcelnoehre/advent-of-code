import { readFileSync } from 'fs';

const file: any = readFileSync('../puzzle.txt', 'utf-8');
const input: string[] = file.toString().trim().split('');
const directions = {
  '^': [0, 1],
  'v': [0, -1],
  '<': [-1, 0],
  '>': [1, 0]
}
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return new Set(decodeInstructions(input)).size;
}

export function part_2(): number {
  const [odds, evens] = input.reduce(([odd, even], element, index) => index % 2 === 1 ? [odd.concat(element), even] : [odd, even.concat(element)], [[], []]);
  return new Set([...decodeInstructions(odds), ...decodeInstructions(evens)]).size;
}

function decodeInstructions(instructions: string[]) {
  const houses: [number, number][] = [[0, 0]];
  let [x, y] = [0, 0];
  instructions.forEach((instruction) => {
    x += directions[instruction][0];
    y += directions[instruction][1];
    houses.push([x, y]);
  });
  return houses.map((house) => house.join());
}