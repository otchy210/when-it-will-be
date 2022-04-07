const lowerA = 'a'.codePointAt(0);
const lowerZ = 'z'.codePointAt(0);
const upperA = 'A'.codePointAt(0);
const upperZ = 'Z'.codePointAt(0);
const number0 = '0'.codePointAt(0);
const number9 = '9'.codePointAt(0);
const possibleSigns = ['+'.codePointAt(0), '-'.codePointAt(0)];

export const isAlphabet = (code: number): boolean => {
    return (lowerA <= code && code <= lowerZ) || (upperA <= code && code <= upperZ);
};

export const isDigit = (code: number): boolean => {
    return number0 <= code && code <= number9;
};

export const isPossibleSign = (code: number): boolean => {
    return possibleSigns.includes(code);
};

export type PossibleWordsIndexes = [index: number, end: number][];

const getWords = (text: string, isCharInWord: (code: number) => boolean): PossibleWordsIndexes => {
    const results: [index: number, length: number][] = [];
    let inWord = false;
    let start = -1;
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if (isCharInWord(code)) {
            if (!inWord) {
                start = i;
            }
            inWord = true;
        } else {
            if (inWord) {
                results.push([start, i]);
                start = -1;
            }
            inWord = false;
        }
    }
    if (inWord) {
        results.push([start, text.length]);
    }
    return results;
};

export const getPossibleTimeZoneIshWords = (text: string): PossibleWordsIndexes => {
    return getWords(text, isAlphabet);
};

export const getPossibleTimeDiffWords = (text: string): PossibleWordsIndexes => {
    return getWords(text, (code: number) => isDigit(code) || isPossibleSign(code));
};
