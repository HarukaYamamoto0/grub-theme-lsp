import {
  RequestMessage,
  NotificationMessage,
} from "vscode-languageserver";

export type RequestType = RequestMessage;
export type NotificationType = NotificationMessage;

export type RequestHandler<P = any, R = any> = (params: P) => R | Promise<R>;
export type NotificationHandler<P = any> = (params: P) => void | Promise<void>;
