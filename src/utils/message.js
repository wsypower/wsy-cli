const chalk = require("chalk");
const command = require("../command/command");
const { program } = require("commander");
/**
 * @description
 * 当指令为空时提示
 * @author wsy
 * @date 2020-12-04  17:01:48
 */
module.exports = {
  make_empty() {
    console.log("\r");
    console.log(chalk.green(" Please specify the project directory:"));
    console.log(chalk.whiteBright(" 🌮  wsy-cli init <project-directory>"));
    console.log("\r");
    console.log(chalk.green(" For example:"));
    console.log(chalk.whiteBright(" 🌯  wsy-cli init my-vue-admin"));
    console.log("\r");
    console.log("\r");
    console.log("\r");
    console.log(
      ` 🚗 Run ${chalk.red.bold(`wsy-cli --help`)} to see all options.`
    );
    console.log("\r");
    process.exit();
  },

  /**
   * @description
   * help 指令提示
   * @author wsy
   * @date 2020-12-04  17:08:27
   */
  help() {
    console.log("\r");
    console.log(`  =====================================`);
    console.log("\r");
    Object.keys(command).forEach((action) => {
      command[action].usages.forEach((usage, index) => {
        console.log(` 🌮  -  ${chalk.cyan(usage)}`);
      });
    });
    console.log("\r");
    console.log(`  =====================================`);
    console.log("\r");
    console.log(chalk.green(program.helpInformation()));
    process.exit();
  },
};
