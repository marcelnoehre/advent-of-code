import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
console.log(part_1());

export function part_1(): string {    
    let [sum, snafu] = [input.reduce((acc, num) => acc + [...num].reduceRight((result, digit, index) => result + (digit === '=' ? -2 : digit === '-' ? -1 : +digit) * (5 ** (num.length - 1 - index)), 0), 0).toString(5).split(''), []];
    for (let i = sum.length - 1; i >= 0; i--) {
        if (+sum[i] < 3) snafu.unshift(sum[i]);
        else {
            snafu.unshift((+sum[i] - 5) === -2 ? '=' : (+sum[i] - 5) === -1 ? '-' : `${(+sum[i] - 5)}`);
            sum[i - 1] = `${+sum[i - 1] + 1}`;
        }
    }
    return snafu.join('');
}