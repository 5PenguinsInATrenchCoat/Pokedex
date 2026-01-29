import type { State } from './state.js';

export async function commandMapForward(state: State): Promise<void>{
// If the next URL doens't exist, URL is undefined  
let URL = state.nextLocationsURL ?? undefined;
const locations = await state.pokeAPI.fetchLocations(URL);

for (const loc of locations.results) {
  console.log(loc.name);
}

state.nextLocationsURL = locations.next;
state.prevLocationsURL = locations.previous;
}

export async function commandMapBack(state: State): Promise<void>{
let URL = state.prevLocationsURL ?? undefined;
const locations = await state.pokeAPI.fetchLocations(URL);

for (const loc of locations.results) {
  console.log(loc.name);
  };

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

}