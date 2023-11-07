import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().trim().split('\n');
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return validate([/^(?!.*ab)(?!.*cd)(?!.*pq)(?!.*xy).*$/, /^(.*[aeiou]){3}.*$/, /(.)\1/]);
}

export function part_2() {
    return validate([/([a-z][a-z]).*\1/, /([a-z])[a-z]\1/]);
}

function validate(validators: RegExp[]): number {
    let counter: number = 0;
    input.forEach(i => {
        if (validators.every(regex => regex.test(i.trim()))) {
            counter++;
        }
    });
    return counter;
}