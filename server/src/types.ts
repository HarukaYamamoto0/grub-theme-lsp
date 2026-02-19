import { RequestMessage, NotificationMessage } from "vscode-languageserver";

export type RequestType = RequestMessage;
export type NotificationType = NotificationMessage;

export type RequestHandler<R = any> = (
  message: RequestMessage,
) => R | Promise<R>;
export type NotificationHandler = (
  notificationMessage: NotificationMessage,
) => void | Promise<void>;
