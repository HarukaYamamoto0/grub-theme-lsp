import { NotificationMessage, SetTraceParams } from "vscode-languageserver";
import log from "../log";

export function setTrace(notificationMessage: NotificationMessage): void {
  const params = notificationMessage.params as SetTraceParams;
  log.write("SetTraceParams: " + params.value);
}
