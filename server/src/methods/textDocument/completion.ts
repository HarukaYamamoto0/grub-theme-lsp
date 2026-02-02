import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  CompletionParams,
} from "vscode-languageserver";
import log from "../../log";

export function completion(params: CompletionParams): CompletionList {
  log.write({ completion: "ok", params });

  return {
    isIncomplete: false,
    items: [
      {
        label: "title-text",
        detail: "GRUB theme property",
        kind: CompletionItemKind.Property,
        documentation: "Text displayed as title",
      },
      {
        label: "desktop-image",
        kind: CompletionItemKind.Property,
      },
      {
        label: "font",
        kind: CompletionItemKind.Property,
      },
    ],
  };
}
