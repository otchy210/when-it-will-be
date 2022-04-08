import { GetOffset, TimeZoneIsh } from '../types';

const genGetOffset = (timeZone: string): GetOffset => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const moment = require('moment-timezone');
    return (time: number) => moment(time).tz(timeZone).format('ZZ');
};

const ptGetOffset = genGetOffset('America/Los_Angeles');
const ctGetOffset = genGetOffset('America/Chicago');
const etGetOffset = genGetOffset('America/New_York');

const timeZoneIshList: TimeZoneIsh[] = [
    // UTC
    ['UTC', '+0000'],
    ['GMT', '+0000'],

    // US
    ['PST', '-0800'],
    ['PDT', '-0700'],
    ['PT', ptGetOffset],
    ['Pacific', ptGetOffset],
    ['CST', '-0600'],
    ['CDT', '-0500'],
    ['CT', ctGetOffset],
    ['Central', ctGetOffset],
    ['AUS', ctGetOffset],
    ['Austin', ctGetOffset],
    ['EST', '-0500'],
    ['EDT', '-0400'],
    ['ET', etGetOffset],
    ['Eastern', etGetOffset],

    // Japan
    ['JST', '+0900'],
    ['Japan', '+0900'],
    ['TKY', '+0900'],
    ['Tokyo', '+0900'],

    // Singapore
    ['SGT', '+0800'],
    ['SST', '+0800'],
    ['SIN', '+0800'],
    ['Singapore', '+0800'],

    // India
    ['IST', '+0530'],
    ['India', '+0530'],
    ['HYD', '+0530'],
    ['Hyderabad', '+0530'],
];

const timeZoneIshMap = timeZoneIshList.reduce((map, [label, offset]) => {
    const key = label.toLowerCase();
    if (map.has(key)) {
        throw new Error(`Duplicate label: ${label}`);
    }
    map.set(key, offset);
    return map;
}, new Map<string, string | GetOffset>());

export const isTimeZoneIshString = (text: string): boolean => {
    return timeZoneIshMap.has(text.toLowerCase());
};

const timeOffsetRegEx = /^[+-][01][0-9]([03]0)?$/;

export const isTimeOffsetString = (text: string): boolean => {
    return timeOffsetRegEx.test(text);
};

const isGetOffset = (offset: string | GetOffset): offset is GetOffset => {
    return typeof offset === 'function';
};

export const getOffset = (text: string, time: number): string | undefined => {
    if (isTimeOffsetString(text)) {
        return text.length === 3 ? `${text}00` : text;
    }
    if (!isTimeZoneIshString(text)) {
        return;
    }
    const key = text.toLowerCase();
    const offset = timeZoneIshMap.get(key);
    if (isGetOffset(offset)) {
        return offset(time);
    }
    return offset;
};
