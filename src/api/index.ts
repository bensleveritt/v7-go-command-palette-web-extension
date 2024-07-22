import type { Command } from "../types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": import.meta.env.VITE_V7_GO_API_KEY,
  },
};

const apiUrl = "https://go.v7labs.com/api";
const workspaceId = "0190898d-e3b2-7870-8f64-ca7e3855018a";

export async function getWorkspaces() {
  return fetch(`${apiUrl}/workspaces`, options);
}

export async function createProject(name, workspaceId) {
  return fetch(`${apiUrl}/workspaces/${workspaceId}/projects`, {
    headers: {
      ...options.headers,
      "content-type": "application/json",
    },
    method: "POST",
  });
}

export const commandOptions: Command[] = [
  { label: "New project", fn: createProject },
  { label: "Start chat", fn: createProject },
  { label: "Navigate to row", fn: createProject },
  { label: "Export project", fn: createProject },
  { label: "Add property", fn: createProject },
];
