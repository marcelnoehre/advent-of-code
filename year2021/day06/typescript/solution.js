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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split(',').map(function (num) { return parseInt(num, 10); });
console.log(part_1(__spreadArray([], arr, true)));
console.log(part_2(__spreadArray([], arr, true)));
function part_1(arr) {
    for (var _ = 0; _ < 80; _++) {
        var length_1 = arr.length;
        for (var i = 0; i < length_1; i++) {
            if (arr[i] === 0) {
                arr.push(8);
            }
            arr[i] = arr[i] === 0 ? 6 : arr[i] - 1;
        }
    }
    return arr.length;
}
function part_2(arr) {
    var occurence = new Array(9).fill(0);
    arr.forEach(function (timer) { return occurence[timer]++; });
    for (var _ = 0; _ < 256; _++) {
        var newOccurence = new Array(9).fill(0);
        for (var i = 0; i < 8; i++) {
            newOccurence[i] = occurence[i + 1];
            if (i === 6) {
                newOccurence[i] += occurence[0];
                newOccurence[8] += occurence[0];
            }
        }
        occurence = __spreadArray([], newOccurence, true);
    }
    return occurence.reduce(function (acc, val) { return acc + val; }, 0);
}
