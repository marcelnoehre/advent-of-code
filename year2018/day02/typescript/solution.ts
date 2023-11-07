import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().trim().split('\n');
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    let [twice, thrice] = [0, 0];  
    input.forEach((row) => {
        const counter: { [char: string]: number } = {};
        row.split('').forEach((char) => {
            counter[char] = (counter[char] || 0) + 1;
        });
        twice += Object.values(counter).includes(2) ? 1 : 0;
        thrice += Object.values(counter).includes(3) ? 1 : 0;
    });
    return twice * thrice;
}
  

export function part_2():string {
    for(let x = 0; x < input.length; x++) {
        for(let y = 0; y < input.length; y++) {
            let [difference, position] = [0, 0];
            for(let z = 0; z < input[x].length; z++) {
                if(input[x].charAt(z) !== input[y].charAt(z)) {
                    [position, difference] = [z, difference + 1];
                }
            }
            if(difference === 1) {
                return input[x].slice(0, position) + input[x].slice(position + 1, input[x].length);
            }
        }
    }
}  