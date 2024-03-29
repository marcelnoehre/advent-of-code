import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const pattern: RegExp = /^([a-z\-]+)-(\d+)\[([a-z]+)\]$/;
const input: string[][] = file.toString().split('\n').map((room) => room.match(pattern).slice(1, 4));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, room) => acc + (sortChars(room[0].replace(/-/g, '')).slice(0, 5).join('') === room[2] ? Number(room[1]) : 0), 0);
}

export function part_2(): number {
  return Number(input.find((room) => (room[0] = room[0].replace(/-/g, ' ').split('').map(c => String.fromCharCode((c.charCodeAt(0) - 0x61 + Number(room[1])) % 26 + 0x61)).join("")).includes("north"))[1]);
}

function sortChars(inputString: string): string[] {
  const count: { [char: string]: number } = {};
  inputString.split('').forEach(char => count[char] = (count[char] || 0) + 1);
  return Object.keys(count).sort((a, b) => count[b] - count[a] || a.localeCompare(b));
}