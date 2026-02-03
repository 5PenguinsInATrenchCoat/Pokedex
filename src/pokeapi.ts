import { Cache } from "./pokecache";


export class PokeAPI {
    private static readonly BASE_URL = 'https://pokeapi.co/api/v2';
    #cache: Cache;

    constructor() {
        this.#cache = new Cache(5000);
    }
    //called each time PokeAPI is instantiated
    

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.BASE_URL}/location-area?limit=20`
        
        const response = await fetch(url);
        const data = await response.json();
        //response is the direct data from pokeAPI, data is after converting the data into a JSON and is in a more usable format

        this.#cache.add(url, data);

        return data as ShallowLocations;
        // data is already formatted as ShallowLocations, so we can just return it
        
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.BASE_URL}/location-area/${locationName}`;
        
        const response = await fetch(url);
        const data = await response.json();

        return data as Location;
    }
}

export type ShallowLocations = {
    /* Shallow list is the full, unedit list of locations from PokeAPI
    each entry in this list would be equivalent to a single location (?) */
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
};


export type Location = {
    // Each entry from the shallow location list, goes in depth for each entry
    encounter_method_rates: Array<{
        encounter_method: {name: string; url: string};
        version_details: Array<{
            rate: number;
            version: {name: string; url: string};
            }>;
        }>;
    game_index: number
    id: number
    location: {
        name: string
        url: string
    }
    names: Array<{
        language: {name: string; url: string};
        name: string;
    }>
    pokemon_encounters: Array<{
        pokemon: {name: string; url: string};
        version_details: Array<{
            encounter_details: Array<{
                chance: number;
                condition_values: Array<{name: string; url: string}>;
                max_level: number;
                method: {name: string; url: string};
                min_level: number;
            }>;
            version: {name: string; url: string};
            max_chance: number;
        }>;
    }>;
};
