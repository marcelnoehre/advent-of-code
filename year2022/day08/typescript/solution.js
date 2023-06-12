"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n').map(function (row) { return row.split('').map(function (num) { return parseInt(num, 10); }); });
var _a = [arr[0].length, arr.length], width = _a[0], height = _a[1];
var directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];
console.log(part_1());
console.log(part_2());
function part_1() {
    var sum = 0;
    for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
        var _a = directions_1[_i], dx = _a[0], dy = _a[1];
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var i = y + dy;
                var j = x + dx;
                while (i >= 0 && i < height && j >= 0 && j < width) {
                    if (arr[i][j] >= arr[y][x]) {
                        break;
                    }
                    i += dy;
                    j += dx;
                }
                if (i < 0 || i >= height || j < 0 || j >= width) {
                    sum++;
                }
            }
        }
    }
    return sum;
}
function part_2() {
    var result = 0;
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var distance = 1;
            for (var _i = 0, directions_2 = directions; _i < directions_2.length; _i++) {
                var _a = directions_2[_i], dx = _a[0], dy = _a[1];
                var i = y + dy;
                var j = x + dx;
                var sum = 0;
                while (i >= 0 && i < height && j >= 0 && j < width) {
                    sum++;
                    if (arr[i][j] >= arr[y][x]) {
                        break;
                    }
                    i += dy;
                    j += dx;
                }
                distance *= sum;
            }
            result = Math.max(result, distance);
        }
    }
    return result;
}
