"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n');
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(list) {
    var priority = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var sum = 0;
    list.forEach(function (backpack) {
        var first = backpack.slice(0, backpack.length / 2);
        var second = backpack.slice(backpack.length / 2);
        for (var i = 0; i < first.length; i++) {
            for (var j = 0; j < second.length; j++) {
                if (first.charAt(i) == second.charAt(j)) {
                    for (var c = 1; c < priority.length; c++) {
                        if (priority[c] == first.charAt(i)) {
                            sum += c;
                        }
                    }
                    i = first.length;
                    j = second.length;
                }
            }
        }
    });
    return sum;
}
function part_2(list) {
    var priority = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var sum = 0;
    var groups = [];
    var group = [];
    for (var i = 0; i < list.length; i++) {
        if (i % 3 === 0 && i !== 0) {
            groups.push(group);
            group = [list[i]];
        }
        else {
            group.push(list[i]);
        }
    }
    groups.push(group);
    groups.forEach(function (group) {
        for (var x = 0; x < group[0].length; x++) {
            for (var y = 0; y < group[1].length; y++) {
                for (var z = 0; z < group[2].length; z++) {
                    if (group[0].charAt(x) === group[1].charAt(y) && group[1].charAt(y) === group[2].charAt(z)) {
                        for (var c = 1; c < priority.length; c++) {
                            if (priority[c] == group[0].charAt(x)) {
                                sum += c;
                                x = group[0].length;
                                y = group[1].length;
                                z = group[2].length;
                            }
                        }
                    }
                }
            }
        }
    });
    return sum;
}
