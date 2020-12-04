const { version } = require("../package.json");
const { program } = require("commander");
const command = require("../src/command/command");
const apply = require("./index");
const chalk = require("chalk");

/**
 * wsy-cli commands
 *    - config
 *    - init
 */
// 添加 init / config 命令
Object.keys(command).forEach((action) => {
  program
    .command(action)
    .description(command[action].description)
    .alias(command[action].alias)
    .action((source, destination) => {
      apply(action, ...process.argv.slice(3));
    });
});

program
  .option("-y, --yes", "run default action")
  .option("-f, --force", "force all the question")
  .usage("<command> [options]");
// eos -h
// program.on("-h", help);
// program.on("--help", help);
const sauceStr = program.yes ? "yes" : "no sauce";
console.log(sauceStr);
// eos -V   VERSION 为 package.json 中的版本号
program
  .version(version, "-v --version", "display version for wsy-cli")
  .parse(process.argv);

// eos 不带参数时
if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}
function make_green(txt) {
  return chalk.green(txt);
}

function help() {
  console.log("\r\nUsage:");
  Object.keys(command).forEach((action) => {
    command[action].usages.forEach((usage) => {
      console.log("  - " + usage);
    });
  });
  console.log("\r");
}
