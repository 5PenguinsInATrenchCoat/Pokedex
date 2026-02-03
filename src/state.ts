import { createInterface, type Interface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapForward } from "./command_map.js";
import { commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";



export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
    };

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
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
    };
}
