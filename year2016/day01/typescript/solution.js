"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split(', ');
var directions = {
    0: [0, 1],
    1: [1, 0],
    2: [0, -1],
    3: [-1, 0]
};
console.log(part_1());
console.log(part_2());
function part_1() {
    var pos = [0, 0];
    var direction = 0;
    arr.forEach(function (move) {
        direction = (direction + (move.charAt(0) === 'R' ? 1 : -1) + 4) % 4;
        pos[0] += parseInt(move.substring(1), 10) * directions[direction][0];
        pos[1] += parseInt(move.substring(1), 10) * directions[direction][1];
    });
    return -(pos[0] + pos[1]);
}
function part_2() {
    var visited = new Set();
    var pos = [0, 0];
    var direction = 0;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var move = arr_1[_i];
        direction = (direction + (move.charAt(0) === 'R' ? 1 : -1) + 4) % 4;
        var max = parseInt(move.substring(1), 10) * directions[direction][directions[direction][0] === 0 ? 1 : 0];
        for (var i = 0; i < (max < 0 ? max * -1 : max); i++) {
            pos[0] += directions[direction][0];
            pos[1] += directions[direction][1];
            if (visited.has(pos.join(','))) {
                return -(pos[0] + pos[1]);
            }
            else {
                visited.add(pos.join(','));
            }
        }
    }
    ;
}
