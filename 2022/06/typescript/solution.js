"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('');
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(stream) {
    for (var i = 0; i < stream.length - 3; i++) {
        var key = [];
        for (var j = 0; j <= 3; j++) {
            key.push(stream[i + j]);
        }
        if ((new Set(key)).size === key.length) {
            return i + 4;
        }
    }
    return null;
}
function part_2(stream) {
    for (var i = 0; i < stream.length - 3; i++) {
        var key = [];
        for (var j = 0; j <= 13; j++) {
            key.push(stream[i + j]);
        }
        if ((new Set(key)).size === key.length) {
            return i + 14;
        }
    }
    return null;
}
