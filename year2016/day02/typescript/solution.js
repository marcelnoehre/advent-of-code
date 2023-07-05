"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n');
var directions = {
    'L': [-1, 0],
    'R': [1, 0],
    'U': [0, 1],
    'D': [0, -1]
};
console.log(part_1());
console.log(part_2());
function part_1() {
    var _a = ['', 1, 1], password = _a[0], x = _a[1], y = _a[2];
    var keypad = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]
    ];
    arr.forEach(function (sequenz) {
        sequenz.split('').forEach(function (move) {
            x = Math.min(Math.max(x + directions[move][0], 0), 2);
            y = Math.min(Math.max(y + directions[move][1], 0), 2);
        });
        password += keypad[x][y];
    });
    return password;
}
function part_2() {
    var _a = ['', 1, 3], password = _a[0], x = _a[1], y = _a[2];
    var keypad = [
        [null, null, null, null, null, null, null],
        [null, null, null, '5', null, null, null],
        [null, null, 'A', '6', '2', null, null],
        [null, 'D', 'B', '7', '3', '1', null],
        [null, null, 'C', '8', '4', null, null],
        [null, null, null, '9', null, null, null],
        [null, null, null, null, null, null, null]
    ];
    arr.forEach(function (sequenz) {
        sequenz.split('').forEach(function (move) {
            if (keypad[x + directions[move][0]][y + directions[move][1]] !== null) {
                x += directions[move][0];
                y += directions[move][1];
            }
        });
        password += keypad[x][y];
    });
    return password;
}
