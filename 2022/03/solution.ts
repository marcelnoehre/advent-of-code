import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr: string[] = file.toString().trim().split('\r\n');
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(list: string[]):number {
    const priority: string[] = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let sum: number = 0;
    list.forEach(backpack => {
        let first: string = backpack.slice(0, backpack.length/2);
        let second: string = backpack.slice(backpack.length/2);
        for(let i = 0; i < first.length; i++) {
            for(let j = 0; j < second.length; j++) {
                if(first.charAt(i) == second.charAt(j)) {
                    for(let c = 1; c < priority.length; c++) {
                        if(priority[c] == first.charAt(i)) {
                            sum += c;
                        }
                    }
                    i = first.length;
                    j = second.length;
                }
            }
        }
    });
    return sum;
}

function part_2(list: string[]):number {
    const priority: string[] = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let sum: number = 0;
    let groups: string[][] = [];
    let group: string[] = [];
    for(let i = 0; i < list.length; i++) {
        if(i % 3 === 0 && i !== 0) {
            groups.push(group);
            group = [list[i]]
        } else {
            group.push(list[i]);
        }
    }
    groups.push(group);
    groups.forEach(group => {
        for(let x = 0; x < group[0].length; x++) {
            for(let y = 0; y < group[1].length; y++) {
                for(let z = 0; z < group[2].length; z++) {
                    if(group[0].charAt(x) === group[1].charAt(y) && group[1].charAt(y) === group[2].charAt(z)) {
                        for(let c = 1; c < priority.length; c++) {
                            if(priority[c] == group[0].charAt(x)) {
                                sum += c;
                                x = group[0].length;
                                y = group[1].length;
                                z = group[2].length;
                            }
                        }
                    }
                }
            }
        }
    });
    return sum;
}
