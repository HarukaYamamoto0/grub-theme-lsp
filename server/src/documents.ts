import { DocumentUri } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

export type DocumentBody = string;

export const documents = new Map<DocumentUri, TextDocument>();
