const { version } = require("../package.json");
const { program } = require("commander");
const command = require("../src/command/command");
const apply = require("./index");
const { make_empty, help } = require("./utils/message.js");

/**
 * version 为 package.json 中的版本号
 */
program.version(version, "-v,--version", "display version for wsy-cli");

// 添加指令
program
  .option("-y,--yes", "run default action")
  .option("-h,--help", "run default action")
  .option("-f, --force", "force all the question");
/**
 * wsy-cli commands
 *    - config
 *    - init
 */
Object.keys(command).forEach((commandCmdKey, index) => {
  const { action, description, alias } = command[commandCmdKey];
  program
    .command(action)
    .description(description)
    .alias(alias)
    .action((source) => {
      // [] 代表选填，<> 代表必填项
      // source 输入的指令
      apply(commandCmdKey, source);
    });
});

// 注册 option 监听事件
program
  .on("option:help", help)
  .on("option:force", function () {
    console.log("监听force");
    process.exit();
  })
  .on("option:yes", function () {
    console.log("监听yes");
    process.exit();
  });

// 不带参数时
if (!process.argv.slice(2).length) {
  program.help(make_empty);
}

// 监听输入
program.parse(process.argv);
