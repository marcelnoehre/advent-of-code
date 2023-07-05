"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('');
console.log(part_1());
console.log(part_2());
function part_1() {
    return getMarker(4);
}
function part_2() {
    return getMarker(14);
}
function getMarker(length) {
    for (var i = 0; i < arr.length - 3; i++) {
        var key = [];
        for (var j = 0; j <= length - 1; j++) {
            key.push(arr[i + j]);
        }
        if ((new Set(key)).size === key.length) {
            return i + length;
        }
    }
}
