import { getPossibleTimeZoneIshWords, getPossibleTimeOffsetWords, isAlphabet, isDigit, isPossibleSign, starsWithTime } from './Texts';

describe('isAlphabet', () => {
    it('works', () => {
        expect(isAlphabet('a'.codePointAt(0))).toBe(true);
        expect(isAlphabet('t'.codePointAt(0))).toBe(true);
        expect(isAlphabet('z'.codePointAt(0))).toBe(true);
        expect(isAlphabet('A'.codePointAt(0))).toBe(true);
        expect(isAlphabet('T'.codePointAt(0))).toBe(true);
        expect(isAlphabet('Z'.codePointAt(0))).toBe(true);
        expect(isAlphabet('!'.codePointAt(0))).toBe(false);
        expect(isAlphabet('0'.codePointAt(0))).toBe(false);
        expect(isAlphabet('9'.codePointAt(0))).toBe(false);
        expect(isAlphabet('@'.codePointAt(0))).toBe(false);
        expect(isAlphabet('['.codePointAt(0))).toBe(false);
        expect(isAlphabet('`'.codePointAt(0))).toBe(false);
        expect(isAlphabet('{'.codePointAt(0))).toBe(false);
        expect(isAlphabet('あ'.codePointAt(0))).toBe(false);
        expect(isAlphabet('ん'.codePointAt(0))).toBe(false);
    });
});

describe('isDigit', () => {
    it('works', () => {
        expect(isDigit('a'.codePointAt(0))).toBe(false);
        expect(isDigit('z'.codePointAt(0))).toBe(false);
        expect(isDigit('0'.codePointAt(0))).toBe(true);
        expect(isDigit('5'.codePointAt(0))).toBe(true);
        expect(isDigit('9'.codePointAt(0))).toBe(true);
        expect(isDigit('@'.codePointAt(0))).toBe(false);
        expect(isDigit('['.codePointAt(0))).toBe(false);
        expect(isDigit('`'.codePointAt(0))).toBe(false);
        expect(isDigit('{'.codePointAt(0))).toBe(false);
        expect(isDigit('あ'.codePointAt(0))).toBe(false);
        expect(isDigit('ん'.codePointAt(0))).toBe(false);
    });
});

describe('isPossibleSign', () => {
    it('works', () => {
        expect(isPossibleSign('a'.codePointAt(0))).toBe(false);
        expect(isPossibleSign('z'.codePointAt(0))).toBe(false);
        expect(isPossibleSign('0'.codePointAt(0))).toBe(false);
        expect(isPossibleSign('9'.codePointAt(0))).toBe(false);
        expect(isPossibleSign('@'.codePointAt(0))).toBe(false);
        expect(isPossibleSign('['.codePointAt(0))).toBe(false);
        expect(isPossibleSign('`'.codePointAt(0))).toBe(false);
        expect(isPossibleSign('{'.codePointAt(0))).toBe(false);
        expect(isPossibleSign('+'.codePointAt(0))).toBe(true);
        expect(isPossibleSign('-'.codePointAt(0))).toBe(true);
        expect(isPossibleSign(':'.codePointAt(0))).toBe(false);
        expect(isPossibleSign('あ'.codePointAt(0))).toBe(false);
        expect(isPossibleSign('ん'.codePointAt(0))).toBe(false);
    });
});

describe('getPossibleTimeZoneIshWords', () => {
    it('works', () => {
        expect(getPossibleTimeZoneIshWords('aa bb cc')).toMatchObject([
            [0, 2],
            [3, 5],
            [6, 8],
        ]);
        expect(getPossibleTimeZoneIshWords(' abc def ')).toMatchObject([
            [1, 4],
            [5, 8],
        ]);
        expect(getPossibleTimeZoneIshWords('あいabうえcdおかefきく')).toMatchObject([
            [2, 4],
            [6, 8],
            [10, 12],
        ]);
    });
});

describe('getPossibleTimeOffsetWords', () => {
    it('works', () => {
        expect(getPossibleTimeOffsetWords('   +0900  ')).toMatchObject([[3, 8]]);
        expect(getPossibleTimeOffsetWords('+09 00 0-0')).toMatchObject([
            [0, 3],
            [4, 6],
            [7, 10],
        ]);
    });
});

describe('starsWithTime', () => {
    it('works', () => {
        expect(starsWithTime('00')).toMatchObject({ hour: 0, min: undefined, sec: undefined, ampm: undefined });
        expect(starsWithTime('abc00')).toBeFalsy();
        expect(starsWithTime('2359  ')).toMatchObject({ hour: 23, min: 59, sec: undefined, ampm: undefined });
        expect(starsWithTime('01:00 CDT')).toMatchObject({ hour: 1, min: 0, sec: undefined, ampm: undefined });
        expect(starsWithTime('2:59pm')).toMatchObject({ hour: 2, min: 59, sec: undefined, ampm: 'pm' });
        expect(starsWithTime('0812AM')).toMatchObject({ hour: 8, min: 12, sec: undefined, ampm: 'am' });
        expect(starsWithTime('08:12 AM')).toMatchObject({ hour: 8, min: 12, sec: undefined, ampm: 'am' });
        expect(starsWithTime('12:00 p.m.')).toMatchObject({ hour: 12, min: 0, sec: undefined, ampm: 'pm' });
        expect(starsWithTime('5p')).toMatchObject({ hour: 5, min: undefined, sec: undefined, ampm: 'pm' });
        expect(starsWithTime('01:06:59.088162191 -0500 CDT')).toMatchObject({ hour: 1, min: 6, sec: 59, ampm: undefined });
    });
});
