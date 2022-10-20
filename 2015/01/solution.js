"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var row = file.toString().trim();
console.log(part_1(row));
console.log(part_2(row));
function part_1(row) {
    var floor = 0;
    for (var i = 0; i < row.length; i++) {
        floor += row[i] == '(' ? 1 : -1;
    }
    return floor;
}
function part_2(row) {
    var floor = 0;
    for (var i = 0; i < row.length; i++) {
        floor += row[i] == '(' ? 1 : -1;
        if (floor == -1) {
            return i + 1;
        }
    }
    return -1;
}
