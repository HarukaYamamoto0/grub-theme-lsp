import * as fs from "node:fs";

const log = fs.createWriteStream("/tmp/lsp.log", { flags: "a" });

export default {
  write: (message: any) => {
    const timestamp = new Date().toISOString();
    let content: string;

    if (typeof message === "string") {
      content = message;
    } else if (message instanceof Error) {
      content = `${message.name}: ${message.message}\n${message.stack}`;
    } else {
      try {
        content = JSON.stringify(message, (key, value) => 
          typeof value === 'bigint' ? value.toString() : value, 
          2
        );
      } catch (err) {
        content = String(message);
      }
    }

    log.write(`[${timestamp}] ${content}\n`);
  },
};
