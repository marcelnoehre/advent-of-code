"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var presents = file.toString().trim().split('\n').map(function (present) { return present.split('x').map(function (value) { return parseInt(value, 10); }); });
console.log(part_1(presents));
console.log(part_2(presents));
function part_1(presents) {
    var sum = 0;
    for (var i = 0; i < presents.length; i++) {
        var smallest = presents[i][2] * presents[i][0];
        for (var j = 0; j < 2; j++) {
            smallest = presents[i][j] * presents[i][j + 1] < smallest ? presents[i][j] * presents[i][j + 1] : smallest;
        }
        sum += 2 * presents[i][0] * presents[i][1] + 2 * presents[i][1] * presents[i][2] + 2 * presents[i][2] * presents[i][0] + smallest;
    }
    return sum;
}
function part_2(presents) {
    var sum = 0;
    for (var i = 0; i < presents.length; i++) {
        var sides = [presents[i][0] <= presents[i][1] ? presents[i][0] : presents[i][1], presents[i][0] <= presents[i][1] ? presents[i][1] : presents[i][0]];
        sides[1] = presents[i][2] < sides[1] ? presents[i][2] : sides[1];
        sum += presents[i][0] * presents[i][1] * presents[i][2] + (sides[0] + sides[1]) * 2;
    }
    return sum;
}
