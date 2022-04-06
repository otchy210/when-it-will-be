class Highlight {
    outer: HTMLDivElement;
    line: HTMLDivElement;
    inner: HTMLDivElement;
    constructor() {
        this.outer = document.createElement('div');
        this.outer.style.position = 'absolute';
        this.outer.style.margin = '0';
        this.outer.style.padding = '0';
        this.outer.style.border = 'solid 1px #fff';
        this.outer.style.zIndex = '99999999';
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
    hide(): Highlight {
        this.outer.style.display = 'none';
        return this;
    }
    show(): Highlight {
        this.outer.style.display = 'block';
        return this;
    }
    move(x: number, y: number): Highlight {
        this.outer.style.left = `${x - 4 + window.scrollX}px`;
        this.outer.style.top = `${y - 4 + window.scrollY}px`;
        return this;
    }
    resize(width: number, height: number): Highlight {
        this.inner.style.width = `${width}px`;
        this.inner.style.height = `${height}px`;
        return this;
    }
}

const instance = new Highlight();

export const useHighlight = () => instance;
