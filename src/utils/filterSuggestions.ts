import { commandOptions } from "../api/index";
import type { Command } from "../types";

// Filter commands based on the input
export function filterSuggestions(
  input: string,
  commandList: Command[] = commandOptions,
  limit = 5
) {
  if (input === "") {
    return commandList.slice(0, limit);
  }
  return commandList
    .filter((command) =>
      command.label.toLowerCase().includes(input.toLowerCase())
    )
    .slice(0, limit);
}
