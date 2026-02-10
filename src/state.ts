import { createInterface, type Interface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapForward } from "./command_map.js";
import { commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { Pokemon } from "./pokeapi.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
    };

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
};

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Lists all available commands",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Show the next 20 locations",
            callback: commandMapForward,
        },
        mapb: {
            name: "mapb",
            description: "Show the previous 20 locations",
            callback: commandMapBack,
        },
        explore: {
            name: "explore",
            description: "Explore a location area to find Pokemon",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempt to catch a Pokemon by name",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspect a caught Pokemon by name",
            callback: commandInspect
        },
    };
}

export function initState(): State {
    const REPL = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex> ",
});
    
    return {
        readline: REPL,
        commands: getCommands(),
        pokeAPI: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: {},
    };
}
