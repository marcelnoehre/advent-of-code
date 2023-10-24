"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n').map(Number);
console.log(part_1());
console.log(part_2());
function part_1() {
    return iterate(1);
}
function part_2() {
    return iterate(2);
}
function iterate(part) {
    var numbers = part === 1 ? arr : arr.map(function (x) { return x * 811589153; });
    var _a = [numbers.slice().map(function (v, i) { return [i, v]; }), 0], q = _a[0], c = _a[1];
    for (var m = 0; m < (part === 2 ? 10 : 1); m++) {
        for (var i = 0; i < q.length; i++) {
            for (var j = 0; j < q.length; j++) {
                if (q[j][0] === i)
                    break;
            }
            while (q[0][0] !== i)
                q.push(q.shift());
            var val = q.shift();
            var toPop = val[1] % q.length;
            if (toPop < 0)
                toPop += q.length;
            for (var k = 0; k < toPop; k++)
                q.push(q.shift());
            q.push(val);
        }
    }
    for (c; c < q.length; c++)
        if (q[c][1] === 0)
            break;
    return q[(c + 1000) % q.length][1] + q[(c + 2000) % q.length][1] + q[(c + 3000) % q.length][1];
}
