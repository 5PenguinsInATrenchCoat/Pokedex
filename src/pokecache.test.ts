import { Cache } from "./pokecache";
import { test, expect } from "vitest";

test.concurrent.each([
    {
        key: "www.google.com",
        val: "Bulbasaur is cool",
        interval: 5000,
    },
    {
        key: "nintendo.com",
        val: 12345,
        interval: 1000,
    }
])(`Testing cache, ${interval} ms`)

