import moment from 'moment-timezone';
import { TextNodeRange } from '../utils/TextNodeRange';
import { ParsedTime, starsWithTime } from '../utils/Texts';
import { getOffset, isTimeOffsetString, isTimeZoneIshString } from '../utils/TimeZoneIsh';
import { useCard } from './Card';
import { useHighlighter } from './Highlighter';

const isTextNode = (elem: Element | Text): elem is Text => {
    return elem.nodeType == Node.TEXT_NODE;
};

const getTextNodeFromPoint = (elem: Element | Text, x: number, y: number): TextNodeRange | undefined => {
    if (isTextNode(elem)) {
        const range = TextNodeRange.of(elem);
        if (range.contains(x, y)) {
            return range;
        }
    } else {
        for (const child of elem.childNodes) {
            const range = getTextNodeFromPoint(child as Element, x, y);
            if (range) {
                return range;
            }
        }
    }
};

const getHour = (time: ParsedTime): number => {
    if (!time.ampm) {
        return time.hour ?? 0;
    }
    if (time.hour === 12) {
        if (time.ampm === 'am') {
            return 0;
        } else {
            return 12;
        }
    }
    return (time.hour ?? 0) + (time.ampm === 'pm' ? 12 : 0);
};

const WORD_NOT_FOUND = [-1, -1, ''];
let lastFoundWord = WORD_NOT_FOUND;

const tryShowingCard = (e: MouseEvent) => {
    const { target, x, y } = e;
    const hightlighter = useHighlighter();
    const card = useCard();
    const elem = target as Element;
    const range = getTextNodeFromPoint(elem, x, y);
    if (!range) {
        hightlighter.hide();
        card.hide();
        lastFoundWord = WORD_NOT_FOUND;
        return;
    }
    const tzIndexes = range.findwordUnder(x, y);
    if (!tzIndexes) {
        hightlighter.hide();
        card.hide();
        lastFoundWord = WORD_NOT_FOUND;
        return;
    }
    if (tzIndexes[0] === lastFoundWord[0] && tzIndexes[1] === lastFoundWord[1] && tzIndexes[2] === lastFoundWord[2]) {
        return;
    }
    lastFoundWord = tzIndexes;
    const [tzStart, tzEnd, word] = tzIndexes;
    if (!(isTimeZoneIshString(word) || isTimeOffsetString(word))) {
        hightlighter.hide();
        card.hide();
        return;
    }
    let parsedTime: ParsedTime;
    for (let i = 0; i < 16; i++) {
        const foundTime = starsWithTime(range.text.slice(tzStart - i, tzStart));
        if (foundTime && foundTime.isCompleted) {
            parsedTime = foundTime;
            break;
        }
        if (parsedTime && !foundTime) {
            break;
        }
        parsedTime = foundTime;
    }
    if (!parsedTime) {
        hightlighter.hide();
        card.hide();
        return;
    }
    range
        .start(tzStart - parsedTime.length)
        .end(tzEnd)
        .hightlight();

    const now = new Date();
    const year = String(now.getFullYear());
    const mon = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${mon}-${date}`;

    const hour = String(getHour(parsedTime)).padStart(2, '0');
    const min = String(parsedTime.min ?? 0).padStart(2, '0');
    const sec = String(parsedTime.sec ?? 0).padStart(2, '0');
    const time = `${hour}:${min}:${sec}`;

    const isoTimeWithoutTZ = `${today}T${time}`;
    const dateWithoutOffset = new Date(isoTimeWithoutTZ);
    const offset = getOffset(word, dateWithoutOffset.getTime());
    const isoTimeWithOffset = `${isoTimeWithoutTZ}${offset}`;
    const timestamp = moment.tz(isoTimeWithOffset, 'UTC').toDate().getTime();

    card.set(timestamp);
};

let timeoutId;
export const onMouseMove = (e: MouseEvent) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        tryShowingCard(e);
    }, 200);
};
