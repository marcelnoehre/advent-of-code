"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (num) { return parseInt(num, 10); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.reduce(function (acc, num, i) { return (i > 0 && num > arr[i - 1] ? acc + 1 : acc); }, 0);
}
function part_2() {
    return arr.reduce(function (acc, _, i) { return i < arr.length - 3 && arr[i + 1] + arr[i + 2] + arr[i + 3] > arr[i] + arr[i + 1] + arr[i + 2] ? acc + 1 : acc; }, 0);
}
