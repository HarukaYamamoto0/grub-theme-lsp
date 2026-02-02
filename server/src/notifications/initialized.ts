import { NotificationMessage } from "vscode-languageserver";
import log from "../log";

export function initialized(notificationMessage: NotificationMessage): void {
  log.write("Initialized");
}
