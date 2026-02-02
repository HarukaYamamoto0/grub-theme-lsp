import log from "../log";
import { NotificationType } from "../types";

export function initialized(notificationMessage: NotificationType): void {
  log.write("Initialized");
}
