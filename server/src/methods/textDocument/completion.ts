import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  CompletionParams,
  RequestMessage,
} from "vscode-languageserver";
import log from "../../log";
import { documents } from "../../documents";

export function completion(message: RequestMessage): CompletionList {
  const params = message.params as CompletionParams;

  const document = documents.get(params.textDocument.uri);
  const content = document?.getText();

  if (!content) {
    return { isIncomplete: true, items: [] };
  }

  const currentLine = content.split("\n")[params.position.line];
  const lineUntilCursor = currentLine.slice(0, params.position.character);
  const currentWord = lineUntilCursor.replace(/.*\W(.*?)/, "$1");

  const labels = {
    title: {
      isIncomplete: false,
      items: [
        {
          label: "title-name",
          detail: "GRUB theme property",
          kind: CompletionItemKind.Property,
          documentation: "Text displayed as title",
        },
      ],
    },
    "desktop-image": {
      isIncomplete: false,
      items: [
        {
          label: "desktop-image",
          kind: CompletionItemKind.Property,
        },
      ],
    },
    font: {
      isIncomplete: false,
      items: [
        {
          label: "font",
          kind: CompletionItemKind.Property,
        },
      ],
    },
  };

  const keywords = Object.keys(labels);
  const possibleKeyword = keywords
    .map((word) => ({
      word,
      score: word.startsWith(currentWord)
        ? 2
        : word.includes(currentWord)
          ? 1
          : 0,
    }))
    .filter((w) => w.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((w) => w.word);

  if (possibleKeyword.length > 0) {
    return labels[possibleKeyword[0] as keyof typeof labels];
  }

  return {
    isIncomplete: true,
    items: [],
  };
}
