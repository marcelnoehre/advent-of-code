"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().split('\r\n').map(function (tupel) { return tupel.split(' '); });
console.log(part_1(arr));
console.log(part_2(arr));
// A Rock
// B Paper
//C schere
// X Rock 
// y paper
// Z schere
function part_1(list) {
    var sum = 0;
    list.forEach(function (tupel) {
        if (tupel[1] == 'X') {
            sum += 1;
            if (tupel[0] == 'A') {
                sum += 3;
            }
            else if (tupel[0] == 'C') {
                sum += 6;
            }
        }
        else if (tupel[1] == 'Y') {
            sum += 2;
            if (tupel[0] == 'B') {
                sum += 3;
            }
            else if (tupel[0] == 'A') {
                sum += 6;
            }
        }
        else if (tupel[1] == 'Z') {
            sum += 3;
            if (tupel[0] == 'C') {
                sum += 3;
            }
            else if (tupel[0] == 'B') {
                sum += 6;
            }
        }
    });
    return sum;
}
function part_2(list) {
    var sum = 0;
    list.forEach(function (tupel) {
        if (tupel[0] == 'A') {
            if (tupel[1] == 'X') {
                sum += 0 + 3;
            }
            else if (tupel[1] == 'Y') {
                sum += 3 + 1;
            }
            else {
                sum += 6 + 2;
            }
        }
        else if (tupel[0] == 'B') {
            if (tupel[1] == 'X') {
                sum += 0 + 1;
            }
            else if (tupel[1] == 'Y') {
                sum += 3 + 2;
            }
            else {
                sum += 6 + 3;
            }
        }
        else if (tupel[0] == 'C') {
            if (tupel[1] == 'X') {
                sum += 0 + 2;
            }
            else if (tupel[1] == 'Y') {
                sum += 3 + 3;
            }
            else {
                sum += 6 + 1;
            }
        }
    });
    return sum;
}
