function findIndexByProp (prop, val, array) {
    var newIdx = -1;
    for(var i = 0; i < array.length; i++) {
        if(array[i][prop] == val) {
            newIdx = i;
            return newIdx;
        }
    }
    return newIdx;
}

function toArray(obj) {
    return Object.keys(obj).map((key) =>obj[key]);
}


export {toArray, findIndexByProp};