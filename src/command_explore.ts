import { State } from "./state.js";

const BASE_URL = `https://pokeapi.co/api/v2/location-area`;

export async function commandExplore(state: State, location: string) {
    const encounter_list = await state.pokeAPI.fetchLocationDetails(location);

    console.log("Exploring pastoria-city-area...")
    console.log("Found Pokemon:");

    for (const pokemon of encounter_list) {
        console.log(`- ${pokemon}`);
    }
}