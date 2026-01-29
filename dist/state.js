import { createInterface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapForward } from "./command_map.js";
import { commandMapBack } from "./command_map.js";
export function getCommands() {
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
export function initState() {
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
