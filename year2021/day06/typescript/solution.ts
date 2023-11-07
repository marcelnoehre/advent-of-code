import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().trim().split(',').map(Number);
console.log(part_1([...input]));
console.log(part_2([...input]));

export function part_1(input: number[]):number {
    for(let _ = 0; _ < 80; _++) {
        const length = input.length;
        for(let i = 0; i < length; i++) {
            if(input[i] === 0) {
                input.push(8);
            }
            input[i] = input[i] === 0 ? 6 : input[i] - 1;
        }
    }
    return input.length;
}

export function part_2(input: number[]):number {
    let occurence: number[] = new Array(9).fill(0);
    input.forEach((timer) => occurence[timer]++);
    for(let _ = 0; _ < 256; _++) {
        let newOccurence: number[] = new Array(9).fill(0);
        for(let i = 0; i < 8; i++) {
            newOccurence[i] = occurence[i+1];
            if(i === 6) {
                newOccurence[i] += occurence[0];
                newOccurence[8] += occurence[0];
            }
        }
        occurence = [...newOccurence];
    }
    return occurence.reduce((acc, val) => acc + val, 0);
}