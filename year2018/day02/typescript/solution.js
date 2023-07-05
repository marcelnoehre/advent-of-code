"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n');
console.log(part_1());
console.log(part_2());
function part_1() {
    var _a = [0, 0], twice = _a[0], thrice = _a[1];
    arr.forEach(function (row) {
        var counter = {};
        row.split('').forEach(function (char) {
            counter[char] = (counter[char] || 0) + 1;
        });
        twice += Object.values(counter).includes(2) ? 1 : 0;
        thrice += Object.values(counter).includes(3) ? 1 : 0;
    });
    return twice * thrice;
}
function part_2() {
    var _a;
    for (var x = 0; x < arr.length; x++) {
        for (var y = 0; y < arr.length; y++) {
            var _b = [0, 0], difference = _b[0], position = _b[1];
            for (var z = 0; z < arr[x].length; z++) {
                if (arr[x].charAt(z) !== arr[y].charAt(z)) {
                    _a = [z, difference + 1], position = _a[0], difference = _a[1];
                }
            }
            if (difference === 1) {
                return arr[x].slice(0, position) + arr[x].slice(position + 1, arr[x].length);
            }
        }
    }
}
