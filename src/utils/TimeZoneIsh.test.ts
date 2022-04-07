import { getOffset, isTimeOffsetString, isTimeZoneIshString } from './TimeZoneIsh';

describe('isTimeZoneIshString', () => {
    it('works', () => {
        expect(isTimeZoneIshString('utc')).toBe(true);
        expect(isTimeZoneIshString('UTC')).toBe(true);
        expect(isTimeZoneIshString(' utc ')).toBe(false);
    });
});

describe('isTimeOffsetString', () => {
    it('works', () => {
        expect(isTimeOffsetString('-0000')).toBe(true);
        expect(isTimeOffsetString('+08')).toBe(true);
        expect(isTimeOffsetString('+0900')).toBe(true);
        expect(isTimeOffsetString('+0430')).toBe(true);
        expect(isTimeOffsetString('0900')).toBe(false);
        expect(isTimeOffsetString('+123')).toBe(false);
        expect(isTimeOffsetString('+2400')).toBe(false);
        expect(isTimeOffsetString('+abc')).toBe(false);
        expect(isTimeOffsetString(' +0900 ')).toBe(false);
    });
});

describe('getOffset', () => {
    it('works', () => {
        const summer = new Date('2022-08-01').getTime();
        const winter = new Date('2022-01-01').getTime();
        expect(getOffset('Tokyo', summer)).toBe('+0900');
        expect(getOffset('Austin', summer)).toBe('-0500');
        expect(getOffset('aus', winter)).toBe('-0600');
    });
});
