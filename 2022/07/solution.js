"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().split('\r\n');
var global_sum_1 = 0;
var global_sum_2 = 0;
var global_2 = [];
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(commands) {
    var system = [];
    var path = [];
    commands.forEach(function (command) {
        if (command.startsWith('$')) {
            if (command.startsWith('$ cd')) {
                var routeChange = command.split(' ');
                if (routeChange[2] == '/') {
                    path = [];
                }
                else if (routeChange[2] == '..') {
                    path.pop();
                }
                else {
                    path.push(routeChange[2]);
                }
            }
        }
        else if (command.startsWith('dir')) {
            var tmp_1 = system;
            path.forEach(function (route) {
                for (var i = 0; i < tmp_1.length; i++) {
                    if (tmp_1[i][0] == 'folder_' + route) {
                        var max = tmp_1.length;
                        tmp_1 = tmp_1[i];
                        i = max;
                    }
                }
            });
            tmp_1.push(['folder_' + command.split(' ')[1]]);
        }
        else {
            var tmp_2 = system;
            path.forEach(function (route) {
                for (var i = 0; i < tmp_2.length; i++) {
                    if (tmp_2[i][0] == 'folder_' + route) {
                        var max = tmp_2.length;
                        tmp_2 = tmp_2[i];
                        i = max;
                    }
                }
            });
            var file_1 = command.split(' ');
            tmp_2.push('file_' + file_1[1] + '_' + file_1[0]);
        }
    });
    global_sum_2 = sum_part_1(system);
    return global_sum_1;
}
function part_2(commands) {
    var system = [];
    var path = [];
    commands.forEach(function (command) {
        if (command.startsWith('$')) {
            if (command.startsWith('$ cd')) {
                var routeChange = command.split(' ');
                if (routeChange[2] == '/') {
                    path = [];
                }
                else if (routeChange[2] == '..') {
                    path.pop();
                }
                else {
                    path.push(routeChange[2]);
                }
            }
        }
        else if (command.startsWith('dir')) {
            var tmp_3 = system;
            path.forEach(function (route) {
                for (var i = 0; i < tmp_3.length; i++) {
                    if (tmp_3[i][0] == 'folder_' + route) {
                        var max = tmp_3.length;
                        tmp_3 = tmp_3[i];
                        i = max;
                    }
                }
            });
            tmp_3.push(['folder_' + command.split(' ')[1]]);
        }
        else {
            var tmp_4 = system;
            path.forEach(function (route) {
                for (var i = 0; i < tmp_4.length; i++) {
                    if (tmp_4[i][0] == 'folder_' + route) {
                        var max = tmp_4.length;
                        tmp_4 = tmp_4[i];
                        i = max;
                    }
                }
            });
            var file_2 = command.split(' ');
            tmp_4.push('file_' + file_2[1] + '_' + file_2[0]);
        }
    });
    find_free(system);
    global_2.sort(function (n1, n2) { return n1 - n2; });
    return global_2[0];
}
function sum_part_1(array) {
    var sum = 0;
    array.forEach(function (object) {
        if (typeof (object) == 'string') {
            if (object.startsWith('file')) {
                sum += parseInt(object.split('_')[2], 10);
            }
        }
        else {
            sum += sum_part_1(object);
        }
    });
    global_sum_1 += sum <= 100000 ? sum : 0;
    return sum;
}
function find_free(array) {
    var sum = 0;
    array.forEach(function (object) {
        if (typeof (object) == 'string') {
            if (object.startsWith('file')) {
                sum += parseInt(object.split('_')[2], 10);
            }
        }
        else {
            sum += find_free(object);
        }
    });
    if (sum + 70000000 - global_sum_2 >= 30000000) {
        global_2.push(sum);
    }
    return sum;
}
