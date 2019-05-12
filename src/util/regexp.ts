export function matchMult(reg: RegExp, text: string, index = 1): string[] {
    const result = [];
    for (let matchResult = reg.exec(text); matchResult && matchResult.length >= index + 1; matchResult = reg.exec(text)) {
        result.push(matchResult[1]);
    }
    return result;
}