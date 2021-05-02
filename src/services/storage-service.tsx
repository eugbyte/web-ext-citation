import { browser } from "webextension-polyfill-ts";

export interface StorageImpl {
    storage(): Promise<Record<string, any>>;
    getFromStorage(key: string): Promise<any>;
    setStorage(record: Record<string, any>): Promise<void>;
}

export class StorageService implements StorageImpl {
    private _storage = browser.storage.local;

    storage(): Promise<Record<string, any>> {
        return this._storage.get();
    }

    async getFromStorage(key: string): Promise<any> {
        const storage = await this._storage.get();
        return storage[key];
    }

    async setStorage(record: Record<string, any>): Promise<void> {
        return (await this._storage.set(record))
    }
}