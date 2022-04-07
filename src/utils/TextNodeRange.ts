import { Highlighter, useHighlighter } from '../page/Highlighter';

export class TextNodeRange {
    private node: Text;
    private range: Range;
    private length: number;
    private highlighter: Highlighter;

    private constructor(node: Text) {
        const range = node.ownerDocument.createRange();
        range.selectNodeContents(node);
        this.node = node;
        this.range = range;
        this.length = node.textContent.length;
        this.highlighter = useHighlighter();
    }
    contains(x: number, y: number): boolean {
        const rect = this.range.getBoundingClientRect();
        return rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom;
    }
    hightlight() {
        this.highlighter.highlight(this.range);
    }

    static of(node: Text) {
        return new TextNodeRange(node);
    }
}
