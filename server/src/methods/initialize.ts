import type { InitializeResult, InitializeParams } from "vscode-languageserver";

export function initialize(params: InitializeParams): InitializeResult {
  return {
    capabilities: {
      completionProvider: {},
      textDocumentSync: { change: 1, openClose: true },
    },
    serverInfo: {
      name: "grub-theme-lsp",
      version: "0.0.1",
    },
  };
}
