import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().trim().split('\n').map((row) => row.split('\t').map(Number));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, row) => acc + Math.max(...row) - Math.min(...row), 0);
}

export function part_2(): number {
  return input.reduce((acc, row) => {
    const even = row.reduce((pair, num, index) => {
      const div = row.find((n, i) => i !== index && n % num === 0);
      return div ? [div, num] : pair;
    }, []);
    return acc + even[0] / even[1];
  }, 0);
}