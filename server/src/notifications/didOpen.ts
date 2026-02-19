import {
  DidOpenTextDocumentParams,
  NotificationMessage,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { documents } from "../documents";
import log from "../log";

export function didOpen(notificationMessage: NotificationMessage): void {
  const params = notificationMessage.params as DidOpenTextDocumentParams;

  const document = TextDocument.create(
    params.textDocument.uri,
    params.textDocument.languageId,
    params.textDocument.version,
    params.textDocument.text,
  );
  documents.set(params.textDocument.uri, document);
}
