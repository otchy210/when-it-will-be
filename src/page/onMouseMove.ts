import { TextNodeRange } from '../utils/TextNodeRange';
import { isTimeDiffString, isTimeZoneIshString } from '../utils/TimeZoneIsh';
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
    const wordIndexes = range.findwordUnder(x, y);
    if (!wordIndexes) {
        hightlighter.hide();
        return;
    }
    const [wordStart, wordEnd, word] = wordIndexes;
    if (!(isTimeZoneIshString(word) || isTimeDiffString(word))) {
        hightlighter.hide();
        return;
    }
    range.hightlight();
};
