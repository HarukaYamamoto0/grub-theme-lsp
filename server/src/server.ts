import {
  CompletionParams,
  NotificationMessage,
  RequestMessage,
  ResponseError,
  ResponseMessage,
} from "vscode-languageserver";
import log from "./log";
import { methodLookup } from "./methods";
import { notificationLookup } from "./notifications";
import { RequestType } from "./types";

let buffer = "";

process.stdin.on("data", (data: Buffer) => {
  buffer += data;

  while (true) {
    const lengthMatch = buffer.match(/Content-Length: (\d+)\r\n/);
    if (!lengthMatch) break;

    const contentLength = parseInt(lengthMatch[1], 10);
    const messageStart = buffer.indexOf("\r\n\r\n") + 4;

    if (buffer.length < messageStart + contentLength) break;

    const rawMessage = buffer.slice(messageStart, messageStart + contentLength);
    const requestMessage: RequestType = JSON.parse(rawMessage);

    log.write(rawMessage);

    if ("id" in requestMessage) {
      const method = methodLookup[requestMessage.method];
      if (method) respond(requestMessage.id, method(requestMessage));
    } else {
      const notificationMessage = requestMessage as NotificationMessage;
      const method = notificationLookup[notificationMessage.method];
      if (method) method(notificationMessage);
    }

    buffer = buffer.slice(messageStart + contentLength);
  }
});

function respond(
  id: string | number | null,
  result?: string | number | boolean | object | any[] | null | undefined,
  error?: ResponseError<any> | undefined,
) {
  const responseMessageAsString = JSON.stringify({
    id,
    result,
    error,
    jsonrpc: "2.0",
  } as ResponseMessage);

  const messageLength = Buffer.byteLength(responseMessageAsString, "utf-8");
  const header = `Content-Length: ${messageLength}\r\n\r\n`;

  log.write(header + responseMessageAsString);
  process.stdout.write(header + responseMessageAsString);
}
