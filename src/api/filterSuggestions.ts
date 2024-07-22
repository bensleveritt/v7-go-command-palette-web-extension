import type { Command } from "../types";
import { commandOptions } from "./index";

// Filter commands based on the input
export function filterSuggestions(
  input: string,
  commandList: Command[] = commandOptions
) {
  if (input === "") {
    return commandList;
  }
  return commandList.filter((command) =>
    command.label.toLowerCase().includes(input.toLowerCase())
  );
}
