import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  CompletionParams,
  InsertTextFormat,
  RequestMessage,
} from "vscode-languageserver";
import log from "../../log";
import { documents } from "../../documents";

export function completion(message: RequestMessage): CompletionList {
  const params = message.params as CompletionParams;

  const document = documents.get(params.textDocument.uri);
  const content = document?.getText() ?? "";

  const currentLine = content.split("\n")[params.position.line];
  const lineUntilCursor = currentLine.slice(0, params.position.character);
  const match = lineUntilCursor.match(/[\w-]+$/);
  const currentWord = match?.[0] ?? "";

  const globalLabels: Record<string, CompletionItem> = {
    title: {
      label: "title-name",
      detail:
        "Specifies the text to display at the top center of the screen as a title.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'title-name = "$1"',
    },
    "title-font": {
      label: "title-font",
      detail:
        "Defines the font used for the title message at the top of the screen.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'title-font = "$1"',
    },
    "title-color": {
      label: "title-color",
      detail: "Defines the color of the title message.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'title-color = "#$1"',
    },
    "message-font": {
      label: "message-font",
      detail: "Currently unused. Left for backward compatibility.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'message-font = "$1"',
    },
    "message-color": {
      label: "message-color",
      detail: "Currently unused. Left for backward compatibility.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'message-color = "#$1"',
    },
    "message-bg-color": {
      label: "message-bg-color",
      detail: "Currently unused. Left for backward compatibility.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'message-bg-color = "#$1"',
    },
    "desktop-image": {
      label: "desktop-image",
      detail:
        "Specifies the image to use as the background. It will be scaled to fit the screen size or proportionally scaled depending on the scale method.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'desktop-image = "$1"',
    },
    "desktop-image-scale-method": {
      label: "desktop-image-scale-method",
      detail:
        "Specifies the scaling method for the *desktop-image*. Options are “stretch“, “crop“, “padding“, “fitwidth“, " +
        "“fitheight“. “stretch“ for fitting the screen size. Otherwise it is proportional scaling of a part of " +
        "*desktop-image* to the part of the screen. “crop“ part of the *desktop-image* will be proportionally scaled to" +
        " fit the screen sizes. “padding“ the entire *desktop-image* will be contained on the screen. “fitwidth“ for fitting" +
        "the *desktop-image*’s width with screen width. “fitheight“ for fitting the *desktop-image*’s height with the screen height. Default is “stretch“.",
      kind: CompletionItemKind.Keyword,
      documentation: "Currently unused. Left for backward compatibility.",
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'desktop-image-scale-method = "$1"',
    },
    "desktop-image-h-align": {
      label: "desktop-image-h-align",
      detail:
        "Specifies the horizontal alignment of the *desktop-image* if *desktop-image-scale-method* isn’t equeal to “stretch“. Options are “left“, “center“, “right“. Default is “center“.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'desktop-image-h-align = "$1"',
    },
    "desktop-image-v-align": {
      label: "desktop-image-v-align",
      detail:
        "Specifies the image to use as the background. It will be scaled to fit the screen size or proportionally scaled depending on the scale method.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'desktop-image-v-align = "$1"',
    },
    "desktop-color": {
      label: "desktop-color",
      detail:
        "Specifies the color for the background if *desktop-image* is not specified.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'desktop-color = "#$1"',
    },
    "terminal-box": {
      label: "terminal-box",
      detail:
        "Specifies the file name pattern for the styled box slices used for the command line terminal window. For example, “terminal-box: terminal_*.png“ will use the images “terminal_c.png“ as the center area, “terminal_n.png“ as the north (top) edge, “terminal_nw.png“ as the northwest (upper left) corner, and so on. If the image for any slice is not found, it will simply be left empty.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'terminal-box = "$1"',
    },
    "terminal-border": {
      label: "terminal-border",
      detail: "Specifies the border width of the terminal window.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'terminal-border = "$1"',
    },
    "terminal-left": {
      label: "terminal-left",
      detail: "Specifies the left coordinate of the terminal window.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'terminal-left = "$1"',
    },
    "terminal-top": {
      label: "terminal-top",
      detail: "Specifies the top coordinate of the terminal window.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'terminal-top = "$1"',
    },
    "terminal-width": {
      label: "terminal-width",
      detail: "Specifies the width of the terminal window.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'terminal-width = "$1"',
    },
    "terminal-height": {
      label: "terminal-height",
      detail: "Specifies the height of the terminal window.",
      kind: CompletionItemKind.Keyword,
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: 'terminal-height = "$1"',
    },
    label: {
      label: "label block",
      kind: CompletionItemKind.Snippet,
      detail: "Creates a label UI block",
      documentation: {
        kind: "markdown",
        value: "Creates a `label` block with common properties.",
      },
      insertTextFormat: InsertTextFormat.Snippet,
      insertText: [
        "+ label {",
        '\ttext="$1"',
        '\tfont="$2"',
        '\tcolor="#$3"',
        "}",
      ].join("\n"),
    },
  };

  const keywords = Object.keys(globalLabels);

  if (currentLine.length == 0) {
    return {
      isIncomplete: false,
      items: keywords.map(
        (key) => globalLabels[key as keyof typeof globalLabels],
      ),
    };
  }

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
    return {
      isIncomplete: false,
      items: possibleKeyword.map(
        (key) => globalLabels[key as keyof typeof globalLabels],
      ),
    };
  }

  return {
    isIncomplete: true,
    items: [],
  };
}
