const DEFAULT_TIME_ZONES = ['America/Los_Angeles', 'America/Chicago', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo'];
const SELECTED_TIME_ZONES = 'selectedTimeZones';

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
    private async setSelectedTimeZones(selectedTimeZones: string[]): Promise<string[]> {
        await this.setOne<string[]>(SELECTED_TIME_ZONES, selectedTimeZones);
        return selectedTimeZones;
    }
    async getSelectedTimeZones(): Promise<string[]> {
        return syncStorage.getOne<string[]>(SELECTED_TIME_ZONES, DEFAULT_TIME_ZONES);
    }
    async addSelectedTimeZone(timeZone: string): Promise<string[]> {
        const selectedTimeZones = await this.getSelectedTimeZones();
        if (selectedTimeZones.includes(timeZone)) {
            return selectedTimeZones;
        }
        selectedTimeZones.push(timeZone);
        return this.setSelectedTimeZones(selectedTimeZones);
    }
    async removeSelectedTimeZone(timeZone: string): Promise<string[]> {
        const selectedTimeZones = await this.getSelectedTimeZones();
        if (!selectedTimeZones.includes(timeZone)) {
            return selectedTimeZones;
        }
        return this.setSelectedTimeZones(selectedTimeZones.filter((existingTimeZone) => existingTimeZone !== timeZone));
    }
    async restoreDefaultSelectedTimeZones(): Promise<string[]> {
        return this.setSelectedTimeZones(DEFAULT_TIME_ZONES);
    }
}

const syncStorage = new SyncStorage();

export const useSyncStorage = () => syncStorage;
