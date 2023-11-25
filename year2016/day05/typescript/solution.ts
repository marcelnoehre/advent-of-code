import { readFileSync } from 'fs';
import { Md5 } from 'ts-md5';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string = file.toString();
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): string {
  let [i, pw] = [0, ''];
  while (pw.length < 8) {
    const h = Md5.hashStr(input + i++).toString();
    if (h.startsWith('00000')) pw += h.charAt(5);
  }
  return pw;
}

export function part_2(): string {
  const pw: string[] = Array(8).fill('_');
  for (let i = 0; pw.includes('_'); i++) {
    const hash = Md5.hashStr(input + i).toString();
    if ((hash.startsWith('00000')) && (Number(hash.charAt(5)) >= 0 && Number(hash.charAt(5)) < 8 && pw[Number(hash.charAt(5))] === '_')) pw[Number(hash.charAt(5))] = hash.charAt(6);
  }
  return pw.join('');
}