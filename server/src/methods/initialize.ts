import type { InitializeResult, RequestMessage } from "vscode-languageserver";
import { RequestType } from "../types";

export function initialize(requestMessage: RequestType): InitializeResult {
  return {
    capabilities: {
      completionProvider: {},
      textDocumentSync: { change: 1, openClose: true },
    },
    serverInfo: {
      name: "grub-theme-lsp",
      version: "0.0.1",
    },
  } as InitializeResult;
}
