import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split('\n\n').map((passport) => passport.split(/\s+/));
const required: string[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.filter(passport => required.every(field => new Set(passport.map(seq => seq.split(":")[0])).has(field))).length;
}

export function part_2(): number {
  return input.filter(passport => validate(Object.fromEntries(passport.map(seq => seq.split(':'))))).length;
}

function validate(dict: Object): boolean {
  if(!(dict.hasOwnProperty('byr') && 1920 <= Number(dict['byr']) && Number(dict['byr']) <= 2002)) return;
  if(!(dict.hasOwnProperty('iyr') && 2010 <= Number(dict['iyr']) && Number(dict['iyr']) <= 2020)) return;
  if(!(dict.hasOwnProperty('eyr') && 2020 <= Number(dict['eyr']) && Number(dict['eyr']) <= 2030)) return;
  if(!(dict.hasOwnProperty('hcl') && /^#[0-9a-f]{6}$/.test(dict['hcl']))) return;
  if(!(dict.hasOwnProperty('ecl') && ['amb','blu','brn','gry','grn','hzl','oth'].includes(dict['ecl']))) return;
  if(!(dict.hasOwnProperty('pid') && /^\d{9}$/.test(dict['pid']))) return;
  if(dict.hasOwnProperty('hgt') && dict['hgt'].slice(-2) === 'cm' && 150 <= Number(dict['hgt'].slice(0, -2)) && Number(dict['hgt'].slice(0, -2)) <= 193) return true;
  if(dict.hasOwnProperty('hgt') && dict['hgt'].slice(-2) === 'in' && 59 <= Number(dict['hgt'].slice(0, -2)) && Number(dict['hgt'].slice(0, -2)) <= 76) return true;
}