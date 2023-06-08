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
var arr = file.toString().split('\r\n\r\n');
var initalStacks = setupStacks(arr[0].toString().split('\r\n').slice(0, -1).reverse());
var instructions = arr[1].toString().split('\r\n').map(function (row) { return row.split(' ').map(function (element) { return parseInt(element); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    var stacks = initalStacks.map(function (stack) { return __spreadArray([], stack, true); });
    instructions.forEach(function (move) {
        var _a;
        (_a = stacks[move[5] - 1]).push.apply(_a, stacks[move[3] - 1].splice(stacks[move[3] - 1].length - move[1], move[1]).reverse());
    });
    return stacks.map(function (_, i) { return stacks[i].pop(); }).join('');
}
function part_2() {
    var stacks = initalStacks.map(function (stack) { return __spreadArray([], stack, true); });
    instructions.forEach(function (move) {
        var _a;
        (_a = stacks[move[5] - 1]).push.apply(_a, stacks[move[3] - 1].splice(-move[1]));
    });
    return stacks.map(function (_, i) { return stacks[i].pop(); }).join('');
}
function setupStacks(input) {
    var build = __spreadArray([], Array(9), true).map(function () { return []; });
    var _loop_1 = function (i) {
        input.forEach(function (stack) {
            if (/[A-Z]/.test(stack.charAt(i))) {
                build[Math.floor(i / 4)].push(stack.charAt(i));
            }
        });
    };
    for (var i = 1; i < input[0].length; i += 4) {
        _loop_1(i);
    }
    return build;
}
