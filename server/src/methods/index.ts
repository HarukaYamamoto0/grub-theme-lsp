import { RequestMessage, ResponseMessage } from "vscode-languageserver";
import { initialize } from "./initialize";
import { completion } from "./textDocument/completion";
import { RequestType } from "../types";

export type RequestMethod = (requestMessage: RequestType) => object;

export const methodLookup: Record<string, RequestMethod> = {
  initialize,
  "textDocument/completion": completion,
};
