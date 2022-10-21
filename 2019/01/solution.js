"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (num) { return parseInt(num, 10); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(numbers) {
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
        sum += (Math.floor(numbers[i] / 3) - 2);
    }
    return sum;
}
function part_2(numbers) {
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
        var fuel = (Math.floor(numbers[i] / 3) - 2);
        do {
            sum += fuel;
            fuel = (Math.floor(fuel / 3) - 2);
        } while (fuel > 0);
    }
    return sum;
}
