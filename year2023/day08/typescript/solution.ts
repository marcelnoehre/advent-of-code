import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: [string[], {[key: string]: string[]}] = [file.toString().split('\n\n')[0].split('').map((char) => +(char === 'R')), file.toString().split('\n\n')[1].split('\n').reduce((acc, line) => (([left, right]) => (acc[left] = right.match(/\w+/g), acc)) (line.split(' = ')), {})];
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [curr, i] = ['AAA', 0]; 
  while (curr !== 'ZZZ') curr = input[1][curr][input[0][i++ % input[0].length]]; 
  return i;
}

export function part_2(): number {
  const kgv = (...nums) => nums.reduce((acc, n) => (acc * n) / ggt(acc, n));
  const ggt = (...nums) => nums.reduce((acc, n) => (!n ? acc : ggt(n, acc % n)));
  let [curr, i, loop] = [Object.keys(input[1]).filter((key) => key.endsWith('A')), 0, Object.keys(input[1]).filter((key) => key.endsWith('A')).map(() => null)];
  while (!loop.every(Boolean)) {
    curr = curr.map((key, j) => loop[j] ? key : key.endsWith('Z') ? (loop[j] = i, key) : input[1][key][input[0][i % input[0].length]]);
    i++;
  }
  return kgv(...loop);
}