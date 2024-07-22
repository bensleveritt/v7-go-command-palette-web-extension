import { commandOptions } from "../api/index";
import type { Command } from "../types";

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
