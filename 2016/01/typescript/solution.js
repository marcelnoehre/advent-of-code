"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split(', ');
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(statements) {
    var position = [0, 0];
    var direction = 'north';
    for (var i = 0; i < statements.length; i++) {
        if (statements[i][0] == 'R') {
            if (direction == 'north') {
                direction = 'east';
            }
            else if (direction == 'east') {
                direction = 'south';
            }
            else if (direction == 'south') {
                direction = 'west';
            }
            else if (direction == 'west') {
                direction = 'north';
            }
        }
        else if (statements[i][0] == 'L') {
            if (direction == 'north') {
                direction = 'west';
            }
            else if (direction == 'west') {
                direction = 'south';
            }
            else if (direction == 'south') {
                direction = 'east';
            }
            else if (direction == 'east') {
                direction = 'north';
            }
        }
        parseInt(statements[i].substring(1));
        if (direction == 'north') {
            position[1] += parseInt(statements[i].substring(1), 10);
        }
        else if (direction == 'west') {
            position[0] -= parseInt(statements[i].substring(1), 10);
        }
        else if (direction == 'south') {
            position[1] -= parseInt(statements[i].substring(1), 10);
        }
        else if (direction == 'east') {
            position[0] += parseInt(statements[i].substring(1), 10);
        }
    }
    return (position[0] + position[1]) * -1;
}
function part_2(statements) {
    var position = [0, 0];
    var direction = 'north';
    var visited = [[0, 0]];
    for (var i = 0; i < statements.length; i++) {
        if (statements[i][0] == 'R') {
            if (direction == 'north') {
                direction = 'east';
            }
            else if (direction == 'east') {
                direction = 'south';
            }
            else if (direction == 'south') {
                direction = 'west';
            }
            else if (direction == 'west') {
                direction = 'north';
            }
        }
        else if (statements[i][0] == 'L') {
            if (direction == 'north') {
                direction = 'west';
            }
            else if (direction == 'west') {
                direction = 'south';
            }
            else if (direction == 'south') {
                direction = 'east';
            }
            else if (direction == 'east') {
                direction = 'north';
            }
        }
        if (direction == 'north') {
            for (var j = 0; j < parseInt(statements[i].substring(1), 10); j++) {
                position[1]++;
                for (var j_1 = 0; j_1 < visited.length; j_1++) {
                    if (visited[j_1][0] == position[0] && visited[j_1][1] == position[1]) {
                        return (position[0] + position[1]) * -1;
                    }
                }
                visited.push([position[0], position[1]]);
            }
        }
        else if (direction == 'west') {
            for (var j = 0; j < parseInt(statements[i].substring(1), 10); j++) {
                position[0]--;
                for (var j_2 = 0; j_2 < visited.length; j_2++) {
                    if (visited[j_2][0] == position[0] && visited[j_2][1] == position[1]) {
                        return (position[0] + position[1]) * -1;
                    }
                }
                visited.push([position[0], position[1]]);
            }
        }
        else if (direction == 'south') {
            for (var j = 0; j < parseInt(statements[i].substring(1), 10); j++) {
                position[1]--;
                for (var j_3 = 0; j_3 < visited.length; j_3++) {
                    if (visited[j_3][0] == position[0] && visited[j_3][1] == position[1]) {
                        return (position[0] + position[1]) * -1;
                    }
                }
                visited.push([position[0], position[1]]);
            }
        }
        else if (direction == 'east') {
            for (var j = 0; j < parseInt(statements[i].substring(1), 10); j++) {
                position[0]++;
                for (var j_4 = 0; j_4 < visited.length; j_4++) {
                    if (visited[j_4][0] == position[0] && visited[j_4][1] == position[1]) {
                        return (position[0] + position[1]) * -1;
                    }
                }
                visited.push([position[0], position[1]]);
            }
        }
    }
    return null;
}
