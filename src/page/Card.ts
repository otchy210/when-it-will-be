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
        document.body.appendChild(this.iframe);

        this.baseURL = chrome.runtime.getURL('card.html');
    }
    set(timestamp: number): Card {
        const url = `${this.baseURL}?timestamp=${timestamp}`;
        console.log(url);
        this.iframe.setAttribute('src', url);
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
