"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (row) { return row.split(' -> ').map(function (side) { return side.split(',').map(function (num) { return parseInt(num, 10); }); }); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(lines) {
    var field = [];
    for (var y = 0; y < 1000; y++) {
        var row = [];
        for (var x = 0; x < 1000; x++) {
            row.push(0);
        }
        field.push(row);
    }
    for (var i = 0; i < lines.length; i++) {
        if (lines[i][0][0] === lines[i][1][0]) {
            var lower = lines[i][0][1] < lines[i][1][1] ? lines[i][0][1] : lines[i][1][1];
            var upper = lines[i][0][1] < lines[i][1][1] ? lines[i][1][1] : lines[i][0][1];
            for (var y = lower; y <= upper; y++) {
                field[lines[i][0][0]][y]++;
            }
        }
        else if (lines[i][0][1] === lines[i][1][1]) {
            var lower = lines[i][0][0] < lines[i][1][0] ? lines[i][0][0] : lines[i][1][0];
            var upper = lines[i][0][0] < lines[i][1][0] ? lines[i][1][0] : lines[i][0][0];
            for (var x = lower; x <= upper; x++) {
                field[x][lines[i][0][1]]++;
            }
        }
    }
    var counter = 0;
    for (var y = 0; y < 1000; y++) {
        for (var x = 0; x < 1000; x++) {
            if (field[x][y] >= 2) {
                counter++;
            }
        }
    }
    return counter;
}
function part_2(lines) {
    var field = [];
    for (var y = 0; y < 1000; y++) {
        var row = [];
        for (var x = 0; x < 1000; x++) {
            row.push(0);
        }
        field.push(row);
    }
    for (var i = 0; i < lines.length; i++) {
        if (lines[i][0][0] === lines[i][1][0]) {
            var lower = lines[i][0][1] < lines[i][1][1] ? lines[i][0][1] : lines[i][1][1];
            var upper = lines[i][0][1] < lines[i][1][1] ? lines[i][1][1] : lines[i][0][1];
            for (var y = lower; y <= upper; y++) {
                field[lines[i][0][0]][y]++;
            }
        }
        else if (lines[i][0][1] === lines[i][1][1]) {
            var lower = lines[i][0][0] < lines[i][1][0] ? lines[i][0][0] : lines[i][1][0];
            var upper = lines[i][0][0] < lines[i][1][0] ? lines[i][1][0] : lines[i][0][0];
            for (var x = lower; x <= upper; x++) {
                field[x][lines[i][0][1]]++;
            }
        }
        else {
            var lowerX = lines[i][0][0] < lines[i][1][0] ? lines[i][0][0] : lines[i][1][0];
            var upperX = lines[i][0][0] < lines[i][1][0] ? lines[i][1][0] : lines[i][0][0];
            var lowerY = lines[i][0][1] < lines[i][1][1] ? lines[i][0][1] : lines[i][1][1];
            var y = lines[i][0][0] < lines[i][1][0] ? lines[i][0][1] : lines[i][1][1];
            var direction = y == lowerY ? 1 : -1;
            for (var x = lowerX; x <= upperX; x++) {
                field[x][y]++;
                y += direction;
            }
        }
    }
    var counter = 0;
    for (var y = 0; y < 1000; y++) {
        for (var x = 0; x < 1000; x++) {
            if (field[x][y] >= 2) {
                counter++;
            }
        }
    }
    return counter;
}
