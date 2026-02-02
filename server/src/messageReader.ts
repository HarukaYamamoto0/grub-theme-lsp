import log from "./log";
import { RequestType } from "./types";

export class MessageReader {
  private buffer: string = "";

  constructor(private onMessage: (message: RequestType) => void) {}

  public append(data: Buffer) {
    this.buffer += data;
    this.processBuffer();
  }

  private processBuffer() {
    while (true) {
      const lengthMatch = this.buffer.match(/Content-Length: (\d+)\r\n/);
      if (!lengthMatch) break;

      const contentLength = parseInt(lengthMatch[1], 10);
      const headerEnd = this.buffer.indexOf("\r\n\r\n");
      if (headerEnd === -1) break;

      const messageStart = headerEnd + 4;

      if (this.buffer.length < messageStart + contentLength) break;

      const rawMessage = this.buffer.slice(
        messageStart,
        messageStart + contentLength,
      );
      try {
        const message: RequestType = JSON.parse(rawMessage);
        log.write(`Received: ${rawMessage}`);
        this.onMessage(message);
      } catch (e) {
        log.write(`Error parsing message: ${e}`);
      }

      this.buffer = this.buffer.slice(messageStart + contentLength);
    }
  }
}
