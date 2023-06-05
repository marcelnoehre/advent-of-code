"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('').map(function (num) { return parseInt(num, 10); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(numbers) {
    var sum = 0;
    for (var i = 1; i < numbers.length; i++) {
        if (numbers[i] == numbers[i - 1]) {
            sum += numbers[i];
        }
    }
    if (numbers[numbers.length - 1] == numbers[0]) {
        sum += numbers[0];
    }
    return sum;
}
function part_2(numbers) {
    var sum = 0;
    var forward = numbers.length / 2;
    for (var i = 0; i < numbers.length; i++) {
        if (i + forward >= numbers.length - 1) {
            if (numbers[i] == numbers[forward - (numbers.length - i)]) {
                sum += numbers[i];
            }
        }
        else {
            if (numbers[i] == numbers[i + forward]) {
                sum += numbers[i];
            }
        }
    }
    return sum;
}
