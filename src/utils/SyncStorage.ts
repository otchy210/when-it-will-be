const DEFAULT_TIME_ZONE = ['Asia/Tokyo', 'Asia/Singapore'];
const SELECTED_TIME_ZONE = 'selectedTimeZone';

class SyncStorage {
    private storage: chrome.storage.SyncStorageArea;
    constructor() {
        this.storage = chrome.storage.sync;
    }
    private set<T>(items: { [key: string]: T }): Promise<void> {
        return this.storage.set(items);
    }
    private setOne<T>(key: string, value: T): Promise<void> {
        return this.set({ [key]: value });
    }
    private get<T>(keys: string[]): Promise<{ [key: string]: T }> {
        return this.storage.get(keys);
    }
    private async getOne<T>(key: string, defaultValue?: T): Promise<T> {
        const items = await this.get([key]);
        if (items[key]) {
            return items[key] as T;
        }
        return defaultValue;
    }
    async getSelectedTimeZones(): Promise<string[]> {
        return syncStorage.getOne<string[]>(SELECTED_TIME_ZONE, DEFAULT_TIME_ZONE);
    }
    async addSelectedTimeZone(timeZone: string): Promise<string[]> {
        const selectedTimeZone = await this.getSelectedTimeZones();
        if (selectedTimeZone.includes(timeZone)) {
            return selectedTimeZone;
        }
        selectedTimeZone.push(timeZone);
        this.setOne<string[]>(SELECTED_TIME_ZONE, selectedTimeZone);
        return selectedTimeZone;
    }
}

const syncStorage = new SyncStorage();

export const useSyncStorage = () => syncStorage;
