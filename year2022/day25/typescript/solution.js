"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n');
console.log(part_1());
function part_1() {
    var _a = __read([arr.reduce(function (acc, num) { return acc + __spreadArray([], __read(num), false).reduceRight(function (result, digit, index) { return result + (digit === '=' ? -2 : digit === '-' ? -1 : +digit) * (Math.pow(5, (num.length - 1 - index))); }, 0); }, 0).toString(5).split(''), []], 2), sum = _a[0], snafu = _a[1];
    for (var i = sum.length - 1; i >= 0; i--) {
        if (+sum[i] < 3)
            snafu.unshift(sum[i]);
        else {
            snafu.unshift((+sum[i] - 5) === -2 ? '=' : (+sum[i] - 5) === -1 ? '-' : "".concat((+sum[i] - 5)));
            sum[i - 1] = "".concat(+sum[i - 1] + 1);
        }
    }
    return snafu.join('');
}
