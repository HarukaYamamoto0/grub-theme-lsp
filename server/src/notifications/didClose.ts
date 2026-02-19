import {
  DidChangeTextDocumentParams,
  NotificationMessage,
} from "vscode-languageserver";
import { documents } from "../documents";

export function didClose(notificationMessage: NotificationMessage): void {
  const params = notificationMessage.params as DidChangeTextDocumentParams;
  documents.delete(params.textDocument.uri);
}
