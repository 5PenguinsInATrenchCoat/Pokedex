import { createInterface, type Interface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { pokeAPI } from "./pokeapi.js";



export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
    };

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: pokeAPI;
    nextLocationsUrl: string;
    prevLocationsUrl: string;
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
    };
}
