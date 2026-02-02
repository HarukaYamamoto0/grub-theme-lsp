import type { InitializeResult, RequestMessage } from "vscode-languageserver";

export function initialize(requestMessage: RequestMessage): InitializeResult {
  return {
    capabilities: { completionProvider: {} },
    serverInfo: {
      name: "grub-theme-lsp",
      version: "0.0.1",
    },
  } as InitializeResult;
}
