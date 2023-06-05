"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n').map(function (instruction) { return instruction.replace('\r', '').split(' '); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(instructions) {
    var lights = [];
    for (var i = 0; i < 1000; i++) {
        var row = [];
        for (var j = 0; j < 1000; j++) {
            row.push(false);
        }
        lights.push(row);
    }
    for (var i = 0; i < instructions.length; i++) {
        if (instructions[i][0] == 'turn') {
            var newStatus = instructions[i][1] == 'on';
            var start = instructions[i][2].split(',').map(function (position) { return parseInt(position, 10); });
            var end = instructions[i][4].split(',').map(function (position) { return parseInt(position, 10); });
            for (var x = start[0]; x <= end[0]; x++) {
                for (var y = start[1]; y <= end[1]; y++) {
                    lights[x][y] = newStatus;
                }
            }
        }
        else {
            var start = instructions[i][1].split(',').map(function (position) { return parseInt(position, 10); });
            var end = instructions[i][3].split(',').map(function (position) { return parseInt(position, 10); });
            for (var x = start[0]; x <= end[0]; x++) {
                for (var y = start[1]; y <= end[1]; y++) {
                    lights[x][y] = !lights[x][y];
                }
            }
        }
    }
    var counter = 0;
    for (var x = 0; x < 1000; x++) {
        for (var y = 0; y < 1000; y++) {
            if (lights[x][y]) {
                counter++;
            }
        }
    }
    return counter;
}
function part_2(instructions) {
    var lights = [];
    for (var i = 0; i < 1000; i++) {
        var row = [];
        for (var j = 0; j < 1000; j++) {
            row.push(0);
        }
        lights.push(row);
    }
    for (var i = 0; i < instructions.length; i++) {
        if (instructions[i][0] == 'turn') {
            var changes = instructions[i][1] == 'on' ? 1 : -1;
            var start = instructions[i][2].split(',').map(function (position) { return parseInt(position, 10); });
            var end = instructions[i][4].split(',').map(function (position) { return parseInt(position, 10); });
            for (var x = start[0]; x <= end[0]; x++) {
                for (var y = start[1]; y <= end[1]; y++) {
                    lights[x][y] = lights[x][y] + changes < 0 ? 0 : lights[x][y] + changes;
                }
            }
        }
        else {
            var start = instructions[i][1].split(',').map(function (position) { return parseInt(position, 10); });
            var end = instructions[i][3].split(',').map(function (position) { return parseInt(position, 10); });
            for (var x = start[0]; x <= end[0]; x++) {
                for (var y = start[1]; y <= end[1]; y++) {
                    lights[x][y] += 2;
                }
            }
        }
    }
    var counter = 0;
    for (var x = 0; x < 1000; x++) {
        for (var y = 0; y < 1000; y++) {
            counter += lights[x][y];
        }
    }
    return counter;
}
