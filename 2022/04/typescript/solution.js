"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n').map(function (group) { return group.split(',').map(function (tupel) { return tupel.split('-').map(function (num) { return parseInt(num, 10); }); }); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(list) {
    var sum = 0;
    list.forEach(function (group) {
        if (group[0][0] <= group[1][0] && group[0][1] >= group[1][1]) {
            sum++;
        }
        else if (group[1][0] <= group[0][0] && group[1][1] >= group[0][1]) {
            sum++;
        }
    });
    return sum;
}
function part_2(list) {
    var sum = 0;
    list.forEach(function (group) {
        if (group[0][0] >= group[1][0] && group[0][0] <= group[1][1]) {
            sum++;
        }
        else if (group[1][0] >= group[0][0] && group[1][0] <= group[0][1]) {
            sum++;
        }
        else if (group[0][1] <= group[1][1] && group[0][1] >= group[1][0]) {
            sum++;
        }
        else if (group[1][1] <= group[0][1] && group[1][1] >= group[0][0]) {
            sum++;
        }
    });
    return sum;
}
