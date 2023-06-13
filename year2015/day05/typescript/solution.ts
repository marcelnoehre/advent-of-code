import { readFileSync } from 'fs';

const file: any = readFileSync('../puzzle.txt', 'utf-8');
const arr: string[] = file.toString().trim().split('\n');
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return validate([/^(?!.*ab)(?!.*cd)(?!.*pq)(?!.*xy).*$/, /^(.*[aeiou]){3}.*$/, /(.)\1/]);
}

function part_2() {
    return validate([/([a-z][a-z]).*\1/, /([a-z])[a-z]\1/]);
}

function validate(validators: RegExp[]): number {
    let counter: number = 0;
    arr.forEach(i => {
        if (validators.every(regex => regex.test(i.trim()))) {
            counter++;
        }
    });
    return counter;
}