import {
  DidChangeConfigurationParams,
  DidChangeTextDocumentParams,
} from "vscode-languageserver";
import { RequestType } from "../types";
import { documents } from "../documents";

export function didChange(requestMessage: RequestType): void {
  const message = requestMessage as DidChangeTextDocumentParams;
}
