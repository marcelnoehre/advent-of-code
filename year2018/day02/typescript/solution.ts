import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr:string[] = file.toString().trim().split('\n');
console.log(part_1());
console.log(part_2());

function part_1(): number {
    let [twice, thrice] = [0, 0];  
    arr.forEach((row) => {
        const counter: { [char: string]: number } = {};
        row.split('').forEach((char) => {
            counter[char] = (counter[char] || 0) + 1;
        });
        twice += Object.values(counter).includes(2) ? 1 : 0;
        thrice += Object.values(counter).includes(3) ? 1 : 0;
    });
    return twice * thrice;
}
  

function part_2():string {
    for(let x = 0; x < arr.length; x++) {
        for(let y = 0; y < arr.length; y++) {
            let [difference, position] = [0, 0];
            for(let z = 0; z < arr[x].length; z++) {
                if(arr[x].charAt(z) !== arr[y].charAt(z)) {
                    [position, difference] = [z, difference + 1];
                }
            }
            if(difference === 1) {
                return arr[x].slice(0, position) + arr[x].slice(position + 1, arr[x].length);
            }
        }
    }
}  