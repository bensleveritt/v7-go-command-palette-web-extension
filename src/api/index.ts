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

export async function createProject() {
  return fetch(`${apiUrl}/workspaces/${workspaceId}/projects`, {
    headers: {
      ...options.headers,
      "content-type": "application/json",
    },
    method: "POST",
  });
}

export function listSuggestions(workspaceId: string) {
  return [{ label: "Create a new project", fn: createProject }];
}
