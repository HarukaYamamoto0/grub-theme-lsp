import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  CompletionParams,
} from "vscode-languageserver";
import { RequestType } from "../../types";
import { documents } from "../../documents";
import log from "../../log";

export function completion(requestMessage: RequestType): CompletionList {
  log.write({ completion: "ok", requestMessage });

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
