export function getContextFromURL(url: string) {
  const [, workspaceId, projectId] =
    url.match(/https:\/\/go.v7labs.com\/([^/]+)(?:\/projects\/([^/]+))?/) || [];

  return { workspaceId, projectId };
}
