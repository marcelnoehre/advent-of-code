import { readFileSync } from 'fs';

const file:any = readFileSync('puzzle.txt', 'utf-8');
const arr:string[] = file.toString().trim().split(', ');
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(statements: string[]) {
    let position: number[] = [0,0];
    let direction: string = 'north';
    for(let i = 0; i < statements.length; i++) {
        if(statements[i][0] == 'R') {
            if(direction == 'north') {
                direction = 'east';
            } else if(direction == 'east') {
                direction = 'south';
            } else if(direction == 'south') {
                direction = 'west';
            } else if(direction == 'west') {
                direction = 'north';
            }
        } else if(statements[i][0] == 'L') {
            if(direction == 'north') {
                direction = 'west';
            } else if(direction == 'west') {
                direction = 'south';
            } else if(direction == 'south') {
                direction = 'east';
            } else if(direction == 'east') {
                direction = 'north';
            }
        }
        parseInt(statements[i].substring(1))
        if(direction == 'north') {
            position[1] += parseInt(statements[i].substring(1), 10);
        } else if(direction == 'west') {
            position[0] -= parseInt(statements[i].substring(1), 10);
        } else if(direction == 'south') {
            position[1] -= parseInt(statements[i].substring(1), 10);
        } else if(direction == 'east') {
            position[0] += parseInt(statements[i].substring(1), 10);
        }
    }
    return (position[0] + position[1]) * -1;
}

function part_2(statements: string[]) {
    let position: number[] = [0,0];
    let direction: string = 'north';
    let visited: number[][] = [[0,0]];
    for(let i = 0; i < statements.length; i++) {
        if(statements[i][0] == 'R') {
            if(direction == 'north') {
                direction = 'east';
            } else if(direction == 'east') {
                direction = 'south';
            } else if(direction == 'south') {
                direction = 'west';
            } else if(direction == 'west') {
                direction = 'north';
            }
        } else if(statements[i][0] == 'L') {
            if(direction == 'north') {
                direction = 'west';
            } else if(direction == 'west') {
                direction = 'south';
            } else if(direction == 'south') {
                direction = 'east';
            } else if(direction == 'east') {
                direction = 'north';
            }
        }
        if(direction == 'north') {
            for(let j = 0; j < parseInt(statements[i].substring(1), 10); j++) {
                position[1]++;
                for(let j = 0; j < visited.length; j++) {
                    if(visited[j][0] == position[0] && visited[j][1] == position[1]) {
                        return (position[0] + position[1]) * -1;
                    }
                }
                visited.push([...[position[0], position[1]]]);
            }
        } else if(direction == 'west') {
            for(let j = 0; j < parseInt(statements[i].substring(1), 10); j++) {
                position[0]--;
                for(let j = 0; j < visited.length; j++) {
                    if(visited[j][0] == position[0] && visited[j][1] == position[1]) {
                        return (position[0] + position[1]) * -1;
                    }
                }
                visited.push([...[position[0], position[1]]]);
            }
        } else if(direction == 'south') {
            for(let j = 0; j < parseInt(statements[i].substring(1), 10); j++) {
                position[1]--;
                for(let j = 0; j < visited.length; j++) {
                    if(visited[j][0] == position[0] && visited[j][1] == position[1]) {
                        return (position[0] + position[1]) * -1;
                    }
                }
                visited.push([...[position[0], position[1]]]);
            }
        } else if(direction == 'east') {
            for(let j = 0; j < parseInt(statements[i].substring(1), 10); j++) {
                position[0]++;
                for(let j = 0; j < visited.length; j++) {
                    if(visited[j][0] == position[0] && visited[j][1] == position[1]) {
                        return (position[0] + position[1]) * -1;
                    }
                }
                visited.push([...[position[0], position[1]]]);
            }
        }
        
    }
    return null;
}