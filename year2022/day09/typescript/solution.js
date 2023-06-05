"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n').map(function (pair) { return pair.split(' '); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(list) {
    var tailPositions = new Set([[0, 0]]);
    var head = [0, 0];
    var tail = [0, 0];
    list.forEach(function (pair) {
        var _loop_1 = function (i) {
            if (pair[0] == 'U') {
                head[1]++;
            }
            else if (pair[0] == 'D') {
                head[1]--;
            }
            else if (pair[0] == 'L') {
                head[0]--;
            }
            else if (pair[0] == 'R') {
                head[0]++;
            }
            if (Math.max(Math.abs(tail[0] - head[0]), Math.abs(tail[1] - head[1])) > 1) {
                tail = [Math.abs(head[0] - tail[0]) === 2 ? (tail[0] + (head[0] - tail[0]) / 2) : (tail[0] + (head[0] - tail[0])), Math.abs(head[1] - tail[1]) === 2 ? (tail[1] + (head[1] - tail[1]) / 2) : (tail[1] + (head[1] - tail[1]))];
                var check_1 = true;
                tailPositions.forEach(function (pos) {
                    if (pos[0] === tail[0] && pos[1] === tail[1]) {
                        check_1 = false;
                    }
                });
                if (check_1) {
                    tailPositions.add(tail);
                }
            }
        };
        for (var i = 0; i < parseInt(pair[1]); i++) {
            _loop_1(i);
        }
    });
    return tailPositions.size;
}
function part_2(list) {
    var tailPositions = new Set([[0, 0]]);
    var head = [0, 0];
    var tail = [];
    for (var i = 0; i < 9; i++) {
        tail.push([0, 0]);
    }
    list.forEach(function (pair) {
        var _loop_2 = function (i) {
            if (pair[0] == 'U') {
                head[1]++;
            }
            else if (pair[0] == 'D') {
                head[1]--;
            }
            else if (pair[0] == 'L') {
                head[0]--;
            }
            else if (pair[0] == 'R') {
                head[0]++;
            }
            for (var j = 0; j < 9; j++) {
                var reference = j === 0 ? head : tail[j - 1];
                if (Math.max(Math.abs(tail[j][0] - reference[0]), Math.abs(tail[j][1] - reference[1])) > 1) {
                    tail[j] = [Math.abs(reference[0] - tail[j][0]) === 2 ? (tail[j][0] + (reference[0] - tail[j][0]) / 2) : (tail[j][0] + (reference[0] - tail[j][0])), Math.abs(reference[1] - tail[j][1]) === 2 ? (tail[j][1] + (reference[1] - tail[j][1]) / 2) : (tail[j][1] + (reference[1] - tail[j][1]))];
                }
            }
            var check = true;
            tailPositions.forEach(function (pos) {
                if (pos[0] === tail[8][0] && pos[1] === tail[8][1]) {
                    check = false;
                }
            });
            if (check) {
                tailPositions.add(tail[8]);
            }
        };
        for (var i = 0; i < parseInt(pair[1]); i++) {
            _loop_2(i);
        }
    });
    return tailPositions.size;
}
