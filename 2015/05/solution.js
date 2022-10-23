"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n');
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(input) {
    var counter = 0;
    var vowelList = ['a', 'e', 'i', 'o', 'u'];
    var naughtyList = ['ab', 'cd', 'pq', 'xy'];
    for (var i = 0; i < input.length; i++) {
        var vowelCounter = 0;
        var previous = '';
        var previousCheck = false;
        var naughtyCheck = true;
        for (var j = 0; j < input[i].length; j++) {
            if (vowelList.includes(input[i][j])) {
                vowelCounter++;
            }
            if (input[i][j] == previous) {
                previousCheck = true;
            }
            previous = input[i][j];
        }
        for (var j = 0; j < naughtyList.length; j++) {
            if (input[i].includes(naughtyList[j])) {
                naughtyCheck = false;
            }
        }
        if (vowelCounter >= 3 && previousCheck && naughtyCheck) {
            counter++;
        }
    }
    return counter;
}
function part_2(input) {
    var pairCheck = /([a-z][a-z]).*\1/;
    var spacerCheck = /([a-z])[a-z]\1/;
    var counter = 0;
    for (var i = 0; i < input.length; i++) {
        if (pairCheck.test(input[i]) && spacerCheck.test(input[i])) {
            counter++;
        }
    }
    return counter;
}
