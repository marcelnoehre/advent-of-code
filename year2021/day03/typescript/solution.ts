import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().trim().split('\n').map((line) => line.replace('\r', ''));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  let [gamma, epsilon] = ['', ''];
  for(let i = 0; i < input[0].length; i++) {
    let counter: number = 0;
    input.forEach((binary) => counter += binary[i] === '0' ? 1 : 0);
    gamma += counter > input.length / 2 ? '0' : '1';
    epsilon += counter > input.length / 2 ? '1' : '0';
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

export function part_2(): number {
  let [oxygen, co2] = [input, input];
  for(let i = 0; i < input[0].length; i++) {
    if(oxygen.length > 1) {
      let counter: number = 0;
      oxygen.forEach((binary) => counter += binary[i] === '1' ? 1 : 0);
      oxygen = oxygen.filter((binary) => binary[i] === (counter >= oxygen.length / 2 ? '1' : '0'));
    }
    if(co2.length > 1) {
      let counter: number = 0;
      co2.forEach((binary) => counter += binary[i] === '1' ? 1 : 0);
      co2 = co2.filter((binary) => binary[i] !== (counter < co2.length / 2 ? '0' : '1'));
    }
  }
  return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
}