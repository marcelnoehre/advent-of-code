"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var md5_1 = require("ts-md5/dist/md5");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var row = file.toString().trim();
console.log(part_1(row));
console.log(part_2(row));
function part_1(key) {
    var counter = 0;
    do {
        if (md5_1.Md5.hashStr(key + counter).substring(0, 5) == '00000') {
            return counter;
        }
        else {
            counter++;
        }
    } while (true);
}
function part_2(key) {
    var counter = 0;
    do {
        if (md5_1.Md5.hashStr(key + counter).substring(0, 6) == '000000') {
            return counter;
        }
        else {
            counter++;
        }
    } while (true);
}
