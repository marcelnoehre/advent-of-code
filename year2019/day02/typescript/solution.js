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
console.log(part_1());
console.log(part_2());
function part_1() {
    return simulate(__spreadArray([], arr, true), 12, 2);
}
function part_2() {
    return (function (tmp) { return 100 * tmp[0] + tmp[1]; })(Array.from({ length: 5555 }, function (_, i) { return [Math.floor(i / 100), i % 100]; }).filter(function (_a) {
        var noun = _a[0], verb = _a[1];
        return simulate(__spreadArray([], arr, true), noun, verb) === 19690720;
    })[0]);
}
function simulate(codes, noun, verb) {
    var _a;
    _a = [noun, verb], codes[1] = _a[0], codes[2] = _a[1];
    for (var i = 0; codes[i] !== 99; i += 4) {
        codes[codes[i + 3]] = codes[i] === 1
            ? codes[codes[i + 1]] + codes[codes[i + 2]]
            : codes[codes[i + 1]] * codes[codes[i + 2]];
    }
    return codes[0];
}
