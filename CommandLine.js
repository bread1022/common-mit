import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

class CommandLine {
  constructor(mit) {
    this.rl = readline.createInterface({ input, output });
    this.mit = mit;
  }

  async start() {
    this.rl.setPrompt("> ");
    this.rl.prompt();

    for await (const input of this.rl) {
      this.relayCommand(input);
      console.log("\n");
      this.rl.prompt();
    }
  }

  end() {
    this.rl.close();
  }

  relayCommand(command) {
    const [mit, cmd, dirname] = command.split(" ");

    if (mit === "quit") {
      console.log("Quitting program");
      this.end();
    }
    if (mit !== "mit") {
      console.log(`Command not found: ${mit}`);
      return;
    }

    switch (cmd) {
      case "list":
        this.mit.list(dirname);
        break;
      case "hash":
        this.mit.hash(dirname);
        break;
      case "zlib":
        this.mit.zlib(dirname);
        break;
      default:
        console.log(`Command not found: ${cmd}`);
        break;
    }
  }
}

export default CommandLine;
