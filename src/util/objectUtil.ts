export function get<T>(object: any, path: string | any[], defaultValue?: T): T {
    return convertArrayToPath(path).reduce((prev, value) => (prev || {})[value], object) || defaultValue;
}

function convertArrayToPath(path: string | any[]): string[] {
    return (
        !Array.isArray(path)
            ?
            (path as string)
                .replace(/^\[/, '')
                .replace(/\[/g, '.')
                .replace(/\]/g, '')
                .split('.')
            :
            path as string[]
    );
}

export function set(object: any, path: string | any[], value: any) {
    return convertArrayToPath(path).reduce((prev, curr, i, arr) => i < arr.length - 1 ? prev[curr] : prev[curr] = value, object);
}

const _toString = Object.prototype.toString;

export function getRawType(obj: any): string {
    return (_toString.call(obj) as string).slice(8, -1);
}

export function isObject(obj: any): boolean {
    return getRawType(obj) === 'Object';
}

export function cloneDeep<T = any>(obj: T): T {
    if(typeof obj !== 'object') {
        throw new Error('obj not object');
    }
    let isArray = Array.isArray(obj);
    let result: any = isArray ? [] : {};
    for(let key in obj) {
        result[key] = isObject(obj[key]) ? cloneDeep(obj[key]) : obj[key];
    }
    return result;
}