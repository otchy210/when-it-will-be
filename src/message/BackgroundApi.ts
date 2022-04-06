import { Json, Message, TimeZoneDB } from '../types';

class BackgroundApi {
    private send(action: string, payload?: Json): Promise<Json> {
        const message: Message = {
            action,
            payload,
        };
        return new Promise((resolve) => {
            chrome.runtime.sendMessage(message, resolve);
        });
    }

    getTimeZoneDB(): Promise<TimeZoneDB> {
        return this.send('getTimeZoneDB') as Promise<TimeZoneDB>;
    }

    getWindowSize(): Promise<{ width: number; height: number }> {
        return this.send('getWindowSize') as Promise<{ width: number; height: number }>;
    }
}

const instance = new BackgroundApi();

export const useBackgroundApi = () => instance;
