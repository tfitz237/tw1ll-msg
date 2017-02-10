export function findIndexByProp (prop: string, val: string, array: any) {
    var newIdx = -1;
    for(var i = 0; i < array.length; i++) {
        if(array[i][prop] == val) {
            newIdx = i;
            return newIdx;
        }
    }
    return newIdx;
}

export function toArray(obj) {
    let arr = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(obj[key]);
        }
    };
    return arr;
}

export interface IError {
    name: string;
    message: string;
    timestamp: number;
}

export function toClassName(name: string) {
    return name.toLowerCase().replace(/\s/g, "-");
}
