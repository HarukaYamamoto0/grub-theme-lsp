import { initialized } from "./initialized";
import { didChange } from "./didChange";
import { NotificationType } from "../types";

export type NotificationHandler = (
  notificationMessage: NotificationType,
) => void;

export const notificationLookup: Record<string, NotificationHandler> = {
  initialized,
  "textDocument/didChange": didChange,
};
