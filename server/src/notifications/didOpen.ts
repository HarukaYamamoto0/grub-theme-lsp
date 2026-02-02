import { DidOpenTextDocumentParams } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { documents } from "../documents";

export function didOpen(params: DidOpenTextDocumentParams): void {
  const document = TextDocument.create(
    params.textDocument.uri,
    params.textDocument.languageId,
    params.textDocument.version,
    params.textDocument.text,
  );
  documents.set(params.textDocument.uri, document);
}
