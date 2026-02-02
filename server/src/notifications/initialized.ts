import log from "../log";
import { InitializedParams } from "vscode-languageserver";

export function initialized(params: InitializedParams): void {
  log.write("Initialized");
}
