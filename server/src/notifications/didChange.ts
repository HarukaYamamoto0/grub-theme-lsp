import {
  DidChangeTextDocumentParams,
  NotificationMessage,
} from "vscode-languageserver";
import { documents } from "../documents";
import { TextDocument } from "vscode-languageserver-textdocument";
import log from "../log";

export function didChange(notificationMessage: NotificationMessage): void {
  const params = notificationMessage.params as DidChangeTextDocumentParams;
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    log.write(`Document not found: ${params.textDocument.uri}`);
    return;
  }
  const updatedDocument = TextDocument.update(
    document,
    params.contentChanges,
    params.textDocument.version,
  );

  log.write(document);
  documents.set(params.textDocument.uri, updatedDocument);
}
