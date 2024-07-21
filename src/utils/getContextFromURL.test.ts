import { describe, expect, it } from "vitest";
import { getContextFromURL } from "./getContextFromURL";

describe("getContextFromURL", () => {
  it("should return workspaceId from URL", () => {
    const url = "https://go.v7labs.com/123";
    const context = getContextFromURL(url);
    expect(context).toEqual({ workspaceId: "123" });
  });

  it("should return projectId and workspaceId from URL", () => {
    const url = "https://go.v7labs.com/123/projects/456";
    const context = getContextFromURL(url);
    expect(context).toEqual({ workspaceId: "123", projectId: "456" });
  });
});
