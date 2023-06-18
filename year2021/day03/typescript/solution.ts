import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:string[] = file.toString().trim().split('\n').map((line) => line.replace('\r', ''));
console.log(part_1());
console.log(part_2());

function part_1(): number {
    let [gamma, epsilon] = ['', ''];
    for(let i = 0; i < arr[0].length; i++) {
        let counter: number = 0;
        arr.forEach((binary) => counter += binary[i] === '0' ? 1 : 0);
        gamma += counter > arr.length / 2 ? '0' : '1';
        epsilon += counter > arr.length / 2 ? '1' : '0';
    }
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function part_2(): number {
    let [oxygen, co2] = [arr, arr];
    for(let i = 0; i < arr[0].length; i++) {
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