"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (num) { return parseInt(num, 10); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.reduce(function (acc, num) { return acc + num; }, 0);
}
function part_2() {
    var _a = [new Set(), 0], frequencies = _a[0], frequency = _a[1];
    while (true) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var number = arr_1[_i];
            if (frequencies.has(frequency += number)) {
                return frequency;
            }
            frequencies.add(frequency);
        }
    }
}
