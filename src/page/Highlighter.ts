export class Highlighter {
    private outer: HTMLDivElement;
    private line: HTMLDivElement;
    private inner: HTMLDivElement;
    constructor() {
        this.outer = document.createElement('div');
        this.outer.style.position = 'absolute';
        this.outer.style.margin = '0';
        this.outer.style.padding = '0';
        this.outer.style.border = 'solid 1px #fff';
        this.outer.style.zIndex = '99999';
        this.outer.style.pointerEvents = 'none';

        this.line = document.createElement('div');
        this.line.style.margin = '0';
        this.line.style.padding = '0';
        this.line.style.border = 'solid 2px #090';

        this.inner = document.createElement('div');
        this.inner.style.margin = '0';
        this.inner.style.padding = '1px';
        this.inner.style.border = 'solid 1px #fff';
        this.inner.style.boxSizing = 'content-box';

        this.outer.appendChild(this.line);
        this.line.appendChild(this.inner);
        document.body.appendChild(this.outer);

        this.hide();
    }
    hide(): Highlighter {
        this.outer.style.display = 'none';
        return this;
    }
    show(): Highlighter {
        this.outer.style.display = 'block';
        return this;
    }
    move(x: number, y: number): Highlighter {
        this.outer.style.left = `${x - 4 + window.scrollX}px`;
        this.outer.style.top = `${y - 4 + window.scrollY}px`;
        return this;
    }
    resize(width: number, height: number): Highlighter {
        this.inner.style.width = `${width}px`;
        this.inner.style.height = `${height}px`;
        return this;
    }
    highlight(range: Range): Highlighter {
        const rect = range.getBoundingClientRect();
        this.resize(rect.width, rect.height).move(rect.x, rect.y).show();
        return this;
    }
}

const instance = new Highlighter();

export const useHighlighter = () => instance;
