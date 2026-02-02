import { initialized } from "./initialized";
import { didChange } from "./didChange";
import { didOpen } from "./didOpen";
import { NotificationHandler } from "../types";

export const notificationLookup: Record<string, NotificationHandler> = {
  initialized,
  "textDocument/didChange": didChange,
  "textDocument/didOpen": didOpen,
};
