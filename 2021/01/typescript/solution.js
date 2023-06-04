"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (num) { return parseInt(num, 10); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(arr) {
    var counter = 0;
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] > arr[i]) {
            counter++;
        }
    }
    return counter;
}
function part_2(arr) {
    var counter = 0;
    for (var i = 0; i < arr.length - 3; i++) {
        var firstGroup = arr[i] + arr[i + 1] + arr[i + 2];
        var secondGroup = arr[i + 1] + arr[i + 2] + arr[i + 3];
        if (secondGroup > firstGroup) {
            counter++;
        }
    }
    return counter;
}
