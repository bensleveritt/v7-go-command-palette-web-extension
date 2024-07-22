import type { Command } from "../types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": import.meta.env.VITE_V7_GO_API_KEY,
  },
};

const apiUrl = "https://go.v7labs.com/api";

export async function getWorkspaces() {
  return fetch(`${apiUrl}/workspaces`, options);
}

async function createProject(payload: { name: string; workspaceId: string }) {
  console.log("Create project", payload.name, payload.workspaceId);
  return fetch(`${apiUrl}/workspaces/${payload.workspaceId}/projects`, {
    headers: {
      ...options.headers,
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: payload.name }),
  });
}

async function startChat() {
  console.log("Start chat");
}

async function navigateToRow() {
  console.log("Navigate to row");
}

async function exportProject() {
  console.log("Export project");
}

async function addProperty() {
  console.log("Add property");
}

export const commandOptions: Command[] = [
  { label: "New project", fn: createProject, payload: { name: "New project" } },
  { label: "Start chat", fn: startChat },
  { label: "Navigate to row", fn: navigateToRow },
  { label: "Export project", fn: exportProject },
  { label: "Add property", fn: addProperty },
];
