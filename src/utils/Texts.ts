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

export const getPossibleTimeOffsetWords = (text: string): PossibleWordsIndexes => {
    return getWords(text, (code: number) => isDigit(code) || isPossibleSign(code));
};

const timeRegEx = /^([012]?[0-9])(:?[0-5][0-9])?(:?[0-5][0-9])?\s*([ap]\.?m?\.?)?.*/i;

type ParsedTiime = {
    hour: number;
    min: number;
    sec: number;
    ampm: string;
};

const parseTime = (timeStr: string | undefined): number | undefined => {
    if (!timeStr) {
        return;
    }
    return Number(timeStr.replaceAll(':', ''));
};

const parseAmpm = (ampm: string | undefined): string | undefined => {
    if (!ampm) {
        return;
    }
    const ampmOnly = ampm.toLowerCase().replaceAll('.', '');
    return ampmOnly.endsWith('m') ? ampmOnly : `${ampmOnly}m`;
};

export const starsWithTime = (text: string): ParsedTiime | undefined => {
    const results = timeRegEx.exec(text);
    if (results) {
        const hour = parseTime(results[1]);
        const min = parseTime(results[2]);
        const sec = parseTime(results[3]);
        const ampm = parseAmpm(results[4]);
        return { hour, min, sec, ampm };
    }
};
