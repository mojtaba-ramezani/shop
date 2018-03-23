export function isUndefined(value: any) {
    return typeof value === 'undefined';
}

export function isFunction(value: any) {
    return typeof value === 'function';
}

export function isNumber(value: any) {
    return typeof value === 'number';
}

export function isString(value: any) {
    return typeof value === 'string';
}

export function isBoolean(value: any) {
    return typeof value === 'boolean';
}

export function isObject(value: any) {
    return value !== null && typeof value === 'object';
}
