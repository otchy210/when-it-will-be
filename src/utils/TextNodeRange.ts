import { Highlighter, useHighlighter } from '../page/Highlighter';
import { getPossibleTimeZoneIshWords, getPossibleTimeOffsetWords, PossibleWordsIndexes } from './Texts';

export class TextNodeRange {
    private node: Text;
    private range: Range;
    private highlighter: Highlighter;

    private constructor(node: Text) {
        const range = node.ownerDocument.createRange();
        range.selectNodeContents(node);
        this.node = node;
        this.range = range;
        this.highlighter = useHighlighter();
    }
    contains(x: number, y: number): boolean {
        const rect = this.range.getBoundingClientRect();
        return rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom;
    }
    hightlight(): TextNodeRange {
        this.highlighter.highlight(this.range);
        return this;
    }
    start(start: number): TextNodeRange {
        this.range.setStart(this.node, start);
        return this;
    }
    end(end: number): TextNodeRange {
        this.range.setEnd(this.node, end);
        return this;
    }
    private wordsContains(text: string, words: PossibleWordsIndexes, x: number, y: number): [start: number, end: number, word: string] | undefined {
        for (const word of words) {
            const [start, end] = word;
            if (this.start(start).end(end).contains(x, y)) {
                return [start, end, text.slice(start, end)];
            }
        }
    }
    findwordUnder(x: number, y: number): [start: number, end: number, word: string] | undefined {
        const text = this.node.textContent;
        const possibleTimeZoneIshWords = getPossibleTimeZoneIshWords(text);
        const possibleTimeZoneIshWord = this.wordsContains(text, possibleTimeZoneIshWords, x, y);
        if (possibleTimeZoneIshWord) {
            return possibleTimeZoneIshWord;
        }
        const timeOffsetWords = getPossibleTimeOffsetWords(text);
        return this.wordsContains(text, timeOffsetWords, x, y);
    }

    static of(node: Text) {
        return new TextNodeRange(node);
    }
}
