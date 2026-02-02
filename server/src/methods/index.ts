import { RequestMessage, ResponseMessage } from "vscode-languageserver";
import { initialize } from "./initialize";
import { completion } from "./textDocument/completion";

export type RequestMethod = (requestMessage: RequestMessage) => object;

export const methodLookup: Record<string, RequestMethod> = {
  initialize,
  "textDocument/completion": completion,
};
