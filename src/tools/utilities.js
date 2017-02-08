"use strict";
function findIndexByProp(prop, val, array) {
    var newIdx = -1;
    for (var i = 0; i < array.length; i++) {
        if (array[i][prop] == val) {
            newIdx = i;
            return newIdx;
        }
    }
    return newIdx;
}
exports.findIndexByProp = findIndexByProp;
function toArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
}
exports.toArray = toArray;
