export function warn(message: string) {
    console.warn('[MVVM Warning]: ', message);
}

export function error(message: string) {
    throw new Error('[MVVM Error]: ' + message);
}