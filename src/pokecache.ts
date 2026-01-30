export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();

    add<T>(key: string, val: T) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val
        });
    }

    get<T>(key: string): T | undefined {
        return this.#cache.get(key)?.val;
    }
/*
    #reap() {
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(entry.key);
            }
*/
        }
    }
}

