import {
  NotificationMessage,
  RequestMessage,
  ResponseError,
  LSPErrorCodes,
} from "vscode-languageserver";
import { methodLookup } from "./methods";
import { notificationLookup } from "./notifications";
import { MessageReader } from "./messageReader";
import { MessageWriter } from "./messageWriter";
import log from "./log";

const writer = new MessageWriter();
const reader = new MessageReader(async (message) => {
  if ("id" in message) {
    const request = message as RequestMessage;
    const handler = methodLookup[request.method];
    if (handler) {
      try {
        const result = await handler(request);
        writer.respond(request.id, result);
      } catch (error) {
        log.write(error);
        if (error instanceof ResponseError) {
          writer.respond(request.id, null, error);
        } else {
          writer.respond(
            request.id,
            null,
            new ResponseError(
              LSPErrorCodes.RequestFailed,
              error instanceof Error ? error.message : String(error),
            ),
          );
        }
      }
    } else {
      writer.respond(
        request.id,
        null,
        new ResponseError(
          LSPErrorCodes.RequestFailed,
          `Method not found: ${request.method}`,
        ),
      );
    }
  } else {
    const notificationMessage = message as NotificationMessage;
    const handler = notificationLookup[notificationMessage.method];
    if (handler) {
      handler(notificationMessage);
    }
  }
});

process.stdin.on("data", (data: Buffer) => {
  reader.append(data);
});
