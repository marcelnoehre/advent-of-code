"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (line) { return line.replace('\r', ''); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(arr) {
    var counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var half = arr.length / 2;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[j].length; j++) {
            if (arr[i][j] == '1') {
                counter[j]++;
            }
        }
    }
    var gamma = '';
    var epsilon = '';
    for (var i = 0; i < counter.length; i++) {
        gamma += counter[i] > half ? '1' : '0';
        epsilon += counter[i] > half ? '0' : '1';
    }
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}
function part_2(arr) {
    var oxygen = arr;
    var co2 = arr;
    var _loop_1 = function (i) {
        if (oxygen.length > 1) {
            var counter_1 = 0;
            for (var j = 0; j < oxygen.length; j++) {
                if (oxygen[j][i] == '1') {
                    counter_1++;
                }
            }
            oxygen = oxygen.filter(function (binary) { return binary[i] == (counter_1 >= oxygen.length / 2 ? '1' : '0'); });
        }
        if (co2.length > 1) {
            var counter_2 = 0;
            for (var j = 0; j < co2.length; j++) {
                if (co2[j][i] == '1') {
                    counter_2++;
                }
            }
            co2 = co2.filter(function (binary) { return binary[i] != (counter_2 < co2.length / 2 ? '0' : '1'); });
        }
    };
    for (var i = 0; i < arr[0].length; i++) {
        _loop_1(i);
    }
    return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
}
