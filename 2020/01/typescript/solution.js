"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (num) { return parseInt(num, 10); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(numbers) {
    for (var i = 0; i < numbers.length; i++) {
        for (var y = 0; y < numbers.length; y++) {
            if (i != y && numbers[i] + numbers[y] == 2020) {
                return numbers[i] * numbers[y];
            }
        }
    }
    return null;
}
function part_2(numbers) {
    for (var i = 0; i < numbers.length; i++) {
        for (var y = 0; y < numbers.length; y++) {
            for (var x = 0; x < numbers.length; x++) {
                if (i != y && i != x && y != x) {
                    if (numbers[i] + numbers[y] + numbers[x] == 2020) {
                        return numbers[i] * numbers[y] * numbers[x];
                    }
                }
            }
        }
    }
}
