import { ResponseMessage, ResponseError } from "vscode-languageserver";
import log from "./log";

export class MessageWriter {
  public respond(
    id: string | number | null,
    result?: any,
    error?: ResponseError<any>,
  ) {
    const responseMessage: ResponseMessage = {
      id,
      result,
      error,
      jsonrpc: "2.0",
    };
    this.write(responseMessage);
  }

  public write(message: object) {
    const messageAsString = JSON.stringify(message);
    const messageLength = Buffer.byteLength(messageAsString, "utf-8");
    const header = `Content-Length: ${messageLength}\r\n\r\n`;

    log.write(`Sending: ${header}${messageAsString}`);
    process.stdout.write(header + messageAsString);
  }
}
