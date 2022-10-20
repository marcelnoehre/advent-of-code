"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (line) { return [line.split(' ')[0], parseInt(line.split(' ')[1], 10)]; });
part_1(arr);
part_2(arr);
function part_1(arr) {
    var horizontalPosition = 0;
    var depth = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][0] == 'forward') {
            horizontalPosition += arr[i][1];
        }
        else if (arr[i][0] == 'down') {
            depth += arr[i][1];
        }
        else if (arr[i][0] == 'up') {
            depth -= arr[i][1];
        }
    }
    console.log(horizontalPosition * depth);
}
function part_2(arr) {
    var horizontalPosition = 0;
    var depth = 0;
    var aim = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][0] == 'forward') {
            horizontalPosition += arr[i][1];
            depth += aim * arr[i][1];
        }
        else if (arr[i][0] == 'down') {
            aim += arr[i][1];
        }
        else if (arr[i][0] == 'up') {
            aim -= arr[i][1];
        }
    }
    console.log(horizontalPosition * depth);
}
