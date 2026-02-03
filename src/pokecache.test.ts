import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
    {
        key: "www.google.com",
        val: "Bulbasaur is cool",
        interval: 4000,
    },
    {
        key: "nintendo.com",
        val: 12345,
        interval: 1000,
    }
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval + 100));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
    });

