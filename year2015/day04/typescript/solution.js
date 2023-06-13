"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var md5_1 = require("ts-md5/dist/md5");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var key = file.toString().trim();
console.log(part_1());
console.log(part_2());
function part_1() {
    return mine(5);
}
function part_2() {
    return mine(6);
}
function mine(digits) {
    var counter = 0;
    while (!(md5_1.Md5.hashStr(key + counter).substring(0, digits) === '0'.repeat(digits))) {
        counter++;
    }
    return counter;
}
