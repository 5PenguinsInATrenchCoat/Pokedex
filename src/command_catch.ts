import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const pokeName = args[0].toLowerCase()
  const pokemon = await state.pokeAPI.fetchPokemon(pokeName);
    
  console.log(`Throwing a Pokeball at ${pokeName}...`);

  let catchChance = Math.random() * 1000;
  
  // Simulate catching the Pokemon with base experience
  if (catchChance < pokemon.base_experience) {
    console.log(`${pokeName} was caught!`);
    state.pokedex[pokeName] = pokemon; // Add the caught Pokemon to the pokedex
  } else {
    console.log(`${pokeName} escaped!`);
  }
  
}
