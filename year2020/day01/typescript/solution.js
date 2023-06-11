"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (num) { return parseInt(num, 10); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.reduce(function (result, num, index, arr) {
        return arr.includes(2020 - num, index + 1) ? num * (2020 - num) : result;
    }, 0);
}
function part_2() {
    return arr.reduce(function (result, num, index, arr) {
        return arr.slice(index + 1).reduce(function (innerResult, innerNum) {
            return arr.slice(index + 2).reduce(function (finalResult, finalNum) {
                return num + innerNum + finalNum === 2020 ? num * innerNum * finalNum : finalResult;
            }, innerResult);
        }, result);
    }, 0);
}
