import { expect, test } from "vitest";
import type { Command } from "../types";
import { filterSuggestions } from "./filterSuggestions";

test("should return suggestions", () => {
  const testCommand1: Command = {
    label: "test1",
    fn: () => {},
  };
  const testCommand2: Command = {
    label: "another command",
    fn: () => {},
  };
  const testCommand3: Command = {
    label: "test2",
    fn: () => {},
  };

  const mockCommandList: Command[] = [testCommand1, testCommand2, testCommand3];
  expect(filterSuggestions("test", mockCommandList)).toEqual([
    testCommand1,
    testCommand3,
  ]);
});
