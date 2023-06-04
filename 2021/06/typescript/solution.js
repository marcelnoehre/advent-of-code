"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split(',').map(function (num) { return parseInt(num, 10); });
console.log(part_1(__spreadArray([], arr, true)));
console.log(part_2(__spreadArray([], arr, true)));
function part_1(list) {
    for (var j = 0; j < 80; j++) {
        var length_1 = list.length;
        for (var i = 0; i < length_1; i++) {
            if (list[i] === 0) {
                list[i] = 6;
                list.push(8);
            }
            else {
                list[i]--;
            }
        }
    }
    return list.length;
}
function part_2(arr) {
    var occurence = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < arr.length; i++) {
        occurence[arr[i]]++;
    }
    for (var j = 0; j < 256; j++) {
        var newOccurence = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 8; i++) {
            newOccurence[i] = occurence[i + 1];
            if (i === 6) {
                newOccurence[i] += occurence[0];
                newOccurence[8] += occurence[0];
            }
        }
        occurence = __spreadArray([], newOccurence, true);
    }
    var sum = 0;
    occurence.forEach(function (element) {
        sum += element;
    });
    return sum;
}
