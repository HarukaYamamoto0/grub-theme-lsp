import type { InitializeResult, RequestMessage } from "vscode-languageserver";

export function initialize(_message: RequestMessage): InitializeResult {
  return {
    capabilities: {
      completionProvider: {},
      textDocumentSync: { openClose: true, change: 1 },
    },
    serverInfo: {
      name: "grub-theme-lsp",
      version: "0.0.1",
    },
  };
}
