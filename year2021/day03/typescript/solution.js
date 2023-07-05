"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (line) { return line.replace('\r', ''); });
console.log(part_1());
console.log(part_2());
function part_1() {
    var _a = ['', ''], gamma = _a[0], epsilon = _a[1];
    var _loop_1 = function (i) {
        var counter = 0;
        arr.forEach(function (binary) { return counter += binary[i] === '0' ? 1 : 0; });
        gamma += counter > arr.length / 2 ? '0' : '1';
        epsilon += counter > arr.length / 2 ? '1' : '0';
    };
    for (var i = 0; i < arr[0].length; i++) {
        _loop_1(i);
    }
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}
function part_2() {
    var _a = [arr, arr], oxygen = _a[0], co2 = _a[1];
    var _loop_2 = function (i) {
        if (oxygen.length > 1) {
            var counter_1 = 0;
            oxygen.forEach(function (binary) { return counter_1 += binary[i] === '1' ? 1 : 0; });
            oxygen = oxygen.filter(function (binary) { return binary[i] === (counter_1 >= oxygen.length / 2 ? '1' : '0'); });
        }
        if (co2.length > 1) {
            var counter_2 = 0;
            co2.forEach(function (binary) { return counter_2 += binary[i] === '1' ? 1 : 0; });
            co2 = co2.filter(function (binary) { return binary[i] !== (counter_2 < co2.length / 2 ? '0' : '1'); });
        }
    };
    for (var i = 0; i < arr[0].length; i++) {
        _loop_2(i);
    }
    return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
}
