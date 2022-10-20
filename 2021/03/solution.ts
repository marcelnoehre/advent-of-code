import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
let arr:string[] = file.toString().trim().split('\n').map((line) => line.replace('\r', ''));
part_1(arr);
part_2(arr);

function part_1(arr: string[]) {
    let counter: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    let half: number = arr.length/2;
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[j].length; j++) {
            if(arr[i][j] == '1') {
                counter[j]++;
            }
        }
    }
    let gamma: string = '';
    let epsilon: string = '';
    for(let i = 0; i < counter.length; i++) {
        gamma += counter[i] > half ? '1' : '0';
        epsilon += counter[i] > half ? '0' : '1'; 
    }
    console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
}

function part_2(arr: string[]) {
    let oxygen: string[] = arr;
    let co2: string[] = arr;
    for(let i = 0; i < arr[0].length; i++) {
        if(oxygen.length > 1) {
            let counter: number = 0;
            for(let j = 0; j < oxygen.length; j++) {
                if(oxygen[j][i] == '1') {
                    counter++;
                }
            }
            oxygen = oxygen.filter((binary) => binary[i] == (counter >= oxygen.length/2? '1' : '0'));
        }
        if(co2.length > 1) {
            let counter: number = 0;
            for(let j = 0; j < co2.length; j++) {
                if(co2[j][i] == '1') {
                    counter++;
                }
            }
            co2 = co2.filter((binary) => binary[i] != (counter < co2.length/2? '0' : '1'));
        }
    }
    console.log(parseInt(oxygen[0], 2) * parseInt(co2[0], 2));
}