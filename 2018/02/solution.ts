import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr:string[] = file.toString().trim().split('\r\n');
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(list: string[]): number {
    let two: number = 0;
    let three: number = 0;
    list.forEach(row => {
        let checkTwo: boolean = false;
        let checkThree: boolean = false;
        for(let i = 0; i < row.length; i++) {
            let counter: number = 0;
            for(let j = 0; j < row.length; j++) {
                if(i !== j && row.charAt(i) === row.charAt(j)) {
                    counter++;
                }
            }
            if(counter === 1) {
                checkTwo = true;
            } else if(counter === 2) {
                checkThree = true;
            }
        }
        if(checkTwo) {
            two++;
        }
        if(checkThree) {
            three++;
        }
    });
    return two*three;
}

function part_2(list: string[]):string {
    for(let x = 0; x < list.length; x++) {
        for(let y = 0; y < list.length; y++) {
            let difference: number = 0;
            let position: number = 0;
            for(let z = 0; z < list[x].length; z++) {
                if(list[x].charAt(z) !== list[y].charAt(z)) {
                    position = z;
                    difference++;
                }
            }
            if(difference === 1) {
                return list[x].slice(0,position)+list[x].slice(position+1,list[x].length);
            }
        }
    }
}