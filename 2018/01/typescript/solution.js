"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (num) { return parseInt(num, 10); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(numbers) {
    var frequency = 0;
    for (var i = 0; i < numbers.length; i++) {
        frequency += numbers[i];
    }
    return frequency;
}
function part_2(numbers) {
    var frequencies = [0];
    var frequency = 0;
    do {
        for (var i = 0; i < numbers.length; i++) {
            frequency += numbers[i];
            if (frequencies.includes(frequency)) {
                return frequency;
            }
            else {
                frequencies.push(frequency);
            }
        }
    } while (true);
}
