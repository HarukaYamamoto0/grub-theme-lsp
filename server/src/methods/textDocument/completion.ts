import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  InitializeResult,
  RequestMessage,
  ResponseMessage,
} from "vscode-languageserver";
import { RequestType } from "../../types";

export function completion(requestMessage: RequestType): CompletionList {
  return {
    isIncomplete: false,
    items: [
      {
        label: "title-text",
        detail: "GRUB theme property",
        kind: CompletionItemKind.Property,
        documentation: "Text displayed as title",
      } as CompletionItem,
      {
        label: "desktop-image",
        kind: CompletionItemKind.Property,
      } as CompletionItem,
      {
        label: "font",
        kind: CompletionItemKind.Property,
      },
    ],
  };
}
