import { Countries, Json, Message } from '../types';

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

    getCountries(): Promise<Countries> {
        return this.send('getCountries') as Promise<Countries>;
    }

    getSelectedTimeZones(): Promise<string[]> {
        return this.send('getSelectedTimeZones') as Promise<string[]>;
    }

    getWindowSize(): Promise<{ width: number; height: number }> {
        return this.send('getWindowSize') as Promise<{ width: number; height: number }>;
    }
}

const instance = new BackgroundApi();

export const useBackgroundApi = () => instance;
