"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n');
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(list) {
    var two = 0;
    var three = 0;
    list.forEach(function (row) {
        var checkTwo = false;
        var checkThree = false;
        for (var i = 0; i < row.length; i++) {
            var counter = 0;
            for (var j = 0; j < row.length; j++) {
                if (i !== j && row.charAt(i) === row.charAt(j)) {
                    counter++;
                }
            }
            if (counter === 1) {
                checkTwo = true;
            }
            else if (counter === 2) {
                checkThree = true;
            }
        }
        if (checkTwo) {
            two++;
        }
        if (checkThree) {
            three++;
        }
    });
    return two * three;
}
function part_2(list) {
    console.log('abcdef'.slice(0, 4) + 'abcdef'.slice(5, 'abcdef'.length));
    for (var x = 0; x < list.length; x++) {
        for (var y = 0; y < list.length; y++) {
            var difference = 0;
            var position = 0;
            for (var z = 0; z < list[x].length; z++) {
                if (list[x].charAt(z) !== list[y].charAt(z)) {
                    position = z;
                    difference++;
                }
            }
            if (difference === 1) {
                return list[x].slice(0, position) + list[x].slice(position + 1, list[x].length);
            }
        }
    }
}
