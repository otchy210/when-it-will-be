import { getPossibleTimeZoneIshWords, getPossibleTimeOffsetWords, isAlphabet, isDigit, isPossibleSign } from './Texts';

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
