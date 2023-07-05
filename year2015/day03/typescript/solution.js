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
var arr = file.toString().trim().split('');
var directions = {
    '^': [0, 1],
    'v': [0, -1],
    '<': [-1, 0],
    '>': [1, 0]
};
console.log(part_1());
console.log(part_2());
function part_1() {
    return new Set(decodeInstructions(arr)).size;
}
function part_2() {
    var _a = arr.reduce(function (_a, element, index) {
        var odd = _a[0], even = _a[1];
        return index % 2 === 1
            ? [odd.concat(element), even] : [odd, even.concat(element)];
    }, [[], []]), odds = _a[0], evens = _a[1];
    return new Set(__spreadArray(__spreadArray([], decodeInstructions(odds), true), decodeInstructions(evens), true)).size;
}
function decodeInstructions(instructions) {
    var houses = [[0, 0]];
    var _a = [0, 0], x = _a[0], y = _a[1];
    instructions.forEach(function (instruction) {
        x += directions[instruction][0];
        y += directions[instruction][1];
        houses.push([x, y]);
    });
    return houses.map(function (house) { return house.join(); });
}
