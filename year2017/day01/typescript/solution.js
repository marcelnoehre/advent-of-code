"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('').map(function (num) { return parseInt(num, 10); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.filter(function (num, index) { return num === arr[(index + 1) % arr.length]; }).reduce(function (acc, val) { return acc + val; }, 0);
}
function part_2() {
    return arr.reduce(function (acc, num, i) { return num === arr[(i + arr.length / 2) % arr.length] ? acc + num : acc; }, 0);
}
