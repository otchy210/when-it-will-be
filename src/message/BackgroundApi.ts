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
    addSelectedTimeZone(timeZone: string): Promise<string[]> {
        return this.send('addSelectedTimeZone', { timeZone }) as Promise<string[]>;
    }
    removeSelectedTimeZone(timeZone: string): Promise<string[]> {
        return this.send('removeSelectedTimeZone', { timeZone }) as Promise<string[]>;
    }
    restoreDefaultSelectedTimeZones(): Promise<string[]> {
        return this.send('restoreDefaultSelectedTimeZones') as Promise<string[]>;
    }
    notifyCardLoaded(width: number, height: number): Promise<boolean> {
        return this.send('bgNotifyCardLoaded', { width, height }) as Promise<boolean>;
    }
}

const instance = new BackgroundApi();

export const useBackgroundApi = () => instance;
