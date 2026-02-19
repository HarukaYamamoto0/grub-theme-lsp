import * as fs from "node:fs";

const log = fs.createWriteStream("/tmp/lsp.json"); // append

export default {
  write: (message: object | unknown) => {
    if (typeof message == "object") {
      log.write(JSON.stringify(message, null, 2));
    } else {
      log.write(message);
    }
    log.write("\n");
  },
};
