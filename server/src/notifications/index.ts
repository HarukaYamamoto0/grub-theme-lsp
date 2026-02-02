import {
  NotificationMessage,
  RequestMessage,
  ResponseMessage,
} from "vscode-languageserver";
import { initialized } from "./initialized";

export type NotificationHandler = (
  notificationMessage: NotificationMessage,
) => void;

export const notificationLookup: Record<string, NotificationHandler> = {
  initialized,
};
