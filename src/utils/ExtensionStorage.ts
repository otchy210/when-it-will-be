class ExtensionStorage {
    private storage: chrome.storage.StorageArea;
    constructor(storage: chrome.storage.StorageArea) {
        this.storage = storage;
    }
    set<T>(items: { [key: string]: T }): Promise<void> {
        return this.storage.set(items);
    }
    setOne<T>(key: string, value: T): Promise<void> {
        return this.set({ [key]: value });
    }
    get<T>(keys: string[]): Promise<{ [key: string]: T }> {
        return this.storage.get(keys);
    }
    getOne<T>(key: string, defaultValue?: T): Promise<T> {
        return new Promise((resolve) => {
            this.get([key]).then((items) => {
                if (items[key]) {
                    resolve(items[key] as T);
                } else {
                    resolve(defaultValue);
                }
            });
        });
    }
}

const syncStorage = new ExtensionStorage(chrome.storage.sync);

export const useSyncStorage = () => syncStorage;
