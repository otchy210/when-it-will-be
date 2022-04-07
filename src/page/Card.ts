class Card {
    private iframe: HTMLIFrameElement;
    private baseURL: string;
    constructor() {
        this.iframe = document.createElement('iframe');
        this.iframe.style.position = 'absolute';
        this.iframe.style.border = 'none';
        this.iframe.style.left = '-9999px';
        this.iframe.style.top = '0';
        this.iframe.style.zIndex = '99999';
        this.iframe.style.pointerEvents = 'none';
        document.body.appendChild(this.iframe);

        this.baseURL = chrome.runtime.getURL('card.html');
    }
    set(time: number): Card {
        const url = `${this.baseURL}?time=${time}`;
        this.iframe.setAttribute('src', url);
        return this;
    }
    size(width: number, height: number): Card {
        this.iframe.style.width = `${width}px`;
        this.iframe.style.height = `${height}px`;
        return this;
    }
    show(x: number, y: number): Card {
        this.iframe.style.left = `${x}px`;
        this.iframe.style.top = `${y}px`;
        return this;
    }
    hide(): Card {
        this.iframe.style.left = '-9999px';
        return this;
    }
}

const instance = new Card();

export const useCard = () => instance;
