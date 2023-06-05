import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: string[] = file.toString().split('\r\n');
let global_sum_1 = 0;
let global_sum_2: number = 0;
let global_list_2: number[] = [];
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(commands: string[]):number {
    let system = [];
    let path: string[] = [];
    commands.forEach(command => {
        if(command.startsWith('$')) {
            if(command.startsWith('$ cd')) {
                let routeChange: string[] = command.split(' ');
                if(routeChange[2] == '/') {
                    path = [];
                } else if(routeChange[2] == '..') {
                    path.pop();
                } else {
                    path.push(routeChange[2]);
                }
            }
        } else if(command.startsWith('dir')) {
            let tmp = system;
            path.forEach(route => {
                for(let i = 0; i < tmp.length; i++) {
                    if(tmp[i][0] == 'folder_'+route) {
                        let max = tmp.length;
                        tmp = tmp[i];
                        i = max;
                    }
                }
            });
            tmp.push(['folder_'+command.split(' ')[1]]);
        } else {
            let tmp = system;
            path.forEach(route => {
                for(let i = 0; i < tmp.length; i++) {
                    if(tmp[i][0] == 'folder_'+route) {
                        let max = tmp.length;
                        tmp = tmp[i];
                        i = max;
                    }
                }
            });
            let file: string[] = command.split(' ');
            tmp.push('file_'+file[1]+'_'+file[0]);
        }
    });
    global_sum_2 = recursive_1(system);
    return global_sum_1;
}

function part_2(commands: string[]):number {
    let system = [];
    let path: string[] = [];
    commands.forEach(command => {
        if(command.startsWith('$')) {
            if(command.startsWith('$ cd')) {
                let routeChange: string[] = command.split(' ');
                if(routeChange[2] == '/') {
                    path = [];
                } else if(routeChange[2] == '..') {
                    path.pop();
                } else {
                    path.push(routeChange[2]);
                }
            }
        } else if(command.startsWith('dir')) {
            let tmp = system;
            path.forEach(route => {
                for(let i = 0; i < tmp.length; i++) {
                    if(tmp[i][0] == 'folder_'+route) {
                        let max = tmp.length;
                        tmp = tmp[i];
                        i = max;
                    }
                }
            });
            tmp.push(['folder_'+command.split(' ')[1]]);
        } else {
            let tmp = system;
            path.forEach(route => {
                for(let i = 0; i < tmp.length; i++) {
                    if(tmp[i][0] == 'folder_'+route) {
                        let max = tmp.length;
                        tmp = tmp[i];
                        i = max;
                    }
                }
            });
            let file: string[] = command.split(' ');
            tmp.push('file_'+file[1]+'_'+file[0]);
        }
    }); 
    recursive_2(system);
    return global_list_2.sort((n1,n2)=>n1-n2)[0];
}

function recursive_1(array: any[]) {
    let sum: number = 0;
    array.forEach(object => {
        if(typeof(object) == 'string') {
            if(object.startsWith('file')) {
                sum += parseInt(object.split('_')[2], 10);
            }
        } else {
            sum += recursive_1(object);
        }
    });
    global_sum_1 += sum <= 100000? sum : 0;
    return sum;
}

function recursive_2(array: any[]) {
    let sum: number = 0;
    array.forEach(object => {
        if(typeof(object) == 'string') {
            if(object.startsWith('file')) {
                sum += parseInt(object.split('_')[2], 10);
            }
        } else {
            sum += recursive_2(object);
        }
    });
    if(sum + 70000000-global_sum_2 >= 30000000) {
        global_list_2.push(sum);
    }
    return sum;
}