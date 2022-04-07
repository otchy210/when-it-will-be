import { TextNodeRange } from '../utils/TextNodeRange';
import { ParsedTime, starsWithTime } from '../utils/Texts';
import { isTimeOffsetString, isTimeZoneIshString } from '../utils/TimeZoneIsh';
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

export const onMouseMove = (e: MouseEvent) => {
    const { target, x, y } = e;
    const hightlighter = useHighlighter();
    const elem = target as Element;
    const range = getTextNodeFromPoint(elem, x, y);
    if (!range) {
        hightlighter.hide();
        return;
    }
    const tzIndexes = range.findwordUnder(x, y);
    if (!tzIndexes) {
        hightlighter.hide();
        return;
    }
    const [tzStart, tzEnd, word] = tzIndexes;
    if (!(isTimeZoneIshString(word) || isTimeOffsetString(word))) {
        hightlighter.hide();
        return;
    }
    let time: ParsedTime;
    for (let i = 0; i < 16; i++) {
        const foundTime = starsWithTime(range.text.slice(tzStart - i, tzStart));
        if (time && !foundTime) {
            break;
        }
        time = foundTime;
    }
    if (!time) {
        hightlighter.hide();
        return;
    }
    range.start(tzStart - time.length);
    range.hightlight();
};
