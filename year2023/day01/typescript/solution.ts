import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const digitMap = {'one':'1','two':'2','three':'3','four':'4','five':'5','six':'6','seven':'7','eight':'8','nine':'9'};
const input: string[] = file.toString().split('\n');

if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.reduce((acc, val) => {
    const digits = Array.from(val).filter(char => /\d/.test(char));
    return acc + Number(digits[0] + digits[digits.length - 1]);
  }, 0);
}

export function part_2(): number {
  const mapDigit = input => digitMap.hasOwnProperty(input) ? digitMap[input] : input;
  return input.reduce((acc, val) => {
    const digits = val.match(/(?:1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine)/g).map(item => mapDigit(item));
    return acc + Number(digits[0] + digits[digits.length-1]);
  }, 0);
}