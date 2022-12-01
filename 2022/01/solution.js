"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n').map(function (num) { return parseInt(num, 10); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(list) {
    var elves = [0];
    var elveId = 0;
    for (var i = 0; i < list.length; i++) {
        if (isNaN(list[i])) {
            elveId++;
            elves.push(0);
        }
        else {
            elves[elveId] += list[i];
        }
    }
    return Math.max.apply(Math, elves);
}
function part_2(list) {
    var elves = [0];
    var elveId = 0;
    for (var i = 0; i < list.length; i++) {
        if (isNaN(list[i])) {
            elveId++;
            elves.push(0);
        }
        else {
            elves[elveId] += list[i];
        }
    }
    elves.sort(function (a, b) { return b - a; });
    return elves[0] + elves[1] + elves[2];
}
