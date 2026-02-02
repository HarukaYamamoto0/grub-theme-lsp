import { initialize } from "./initialize";
import { completion } from "./textDocument/completion";
import { RequestHandler } from "../types";

export const methodLookup: Record<string, RequestHandler> = {
  initialize,
  "textDocument/completion": completion,
};
