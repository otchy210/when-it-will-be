import { useHighlight } from './highlight';

const isTextNode = (elem: Element | Text): elem is Text => {
    return elem.nodeType == Node.TEXT_NODE;
};

const getTextNodeFromPoint = (elem: Element | Text, x: number, y: number): { textNode?: Text; range?: Range } => {
    if (isTextNode(elem)) {
        const range = elem.ownerDocument.createRange();
        range.selectNodeContents(elem);
        const rect = range.getBoundingClientRect();
        if (rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom) {
            return { textNode: elem, range };
        }
    } else {
        for (const child of elem.childNodes) {
            const result = getTextNodeFromPoint(child as Element, x, y);
            if (result && result.textNode) {
                return result;
            }
        }
    }
    return {};
};

export const onMouseMove = (e: MouseEvent) => {
    const { target, x, y } = e;
    const hightlight = useHighlight();
    const elem = target as Element;
    const { textNode, range } = getTextNodeFromPoint(elem, x, y);
    if (!textNode) {
        hightlight.hide();
        return;
    }
    const rect = range.getBoundingClientRect();
    hightlight.resize(rect.width, rect.height).move(rect.x, rect.y).show();
};
