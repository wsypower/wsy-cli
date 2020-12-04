const StateMachine = require("javascript-state-machine");
const fs = require("fs");
const path = require("path");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { make_empty, help } = require("../../../utils/message.js");
const ora = require("ora");
// 有没有projectName

// 有没有这个同名文件？=> 有就提示覆盖：没有就跳过
// 生成文件=>成功？失败？

/**
 *  Name
 *      有name:没有name
 *  path
 *      路径上有文件:路径上没有文件
 *  result
 *      成功:失败
 */
module.exports = StateMachine.factory({
  data(projectName) {
    return {
      projectName: projectName,
      description: null,
      author: null,
    };
  },
  transitions: [
    { name: "init", from: "none", to: "name" },
    { name: "create", from: "name", to: "path" },
    { name: "finish", from: "path", to: "result" },
  ],
  methods: {
    // 检测是否有名称
    // 检测是否同名项目
    onBeforeInit() {
      return new Promise(async (resolve, reject) => {
        try {
          // 检测项目
          await this.setProjectName();
          // 检测有无相同文件
          await this.hasProjectName();
          // 设置 [package] - [description]、[author]
          await this.getDescriptionAndAuthor();
        } catch (error) {
          reject(error);
        }
        resolve();
      });
    },
    onInit() {
      console.log(
        logSymbols.success,
        chalk.green(
          ` Creating a new vue-admin in ${path.resolve(
            process.cwd(),
            this.projectName
          )}`
        )
      );
      let loading = ora("downloading template ...");
      loading.start();
    },
    onLeaveInit() {
      console.log("StateMachine====>onLeaveInit=======>" + this.state);
    },
    OnReplenish() {
      console.log("StateMachine====>OnReplenish=======>" + this.state);
    },
    onBeforeCreate() {
      console.log("StateMachine====>onBeforeCreate=======>" + this.state);
    },
    onCreate() {
      console.log("StateMachine====>onCreate=======>" + this.state);
    },
    onFinish() {
      console.log("StateMachine====>onFinish" + this.state);
    },
    /**
     * @description
     * 检测项目名称，没有就设置
     * 为空直接退出
     * @author wsy
     * @date 2020-12-04  22:43:44
     */
    async setProjectName() {
      if (this.projectName == undefined) {
        try {
          console.log(logSymbols.error, chalk.yellow("🌮 No project name"));
          const { projectName } = await inquirer.prompt([
            {
              type: "input",
              name: "projectName",
              message: "Please enter the project name: ",
            },
          ]);
          return projectName.length == 0
            ? (this.error("The project name cannot be empty"), false)
            : ((this.projectName = projectName), true);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async hasProjectName() {
      const hasProjectName = await fs.existsSync(this.projectName);
      return hasProjectName
        ? (this.error("The project already exists"), false)
        : true;
    },
    /**
     * @description
     * 设置package的 [description] - [author]
     * @author wsy
     * @date 2020-12-04  23:35:34
     */
    async getDescriptionAndAuthor() {
      try {
        const { description, author } = await inquirer.prompt([
          {
            type: "input",
            name: "description",
            message: "Please enter the package.json project description: ",
          },
          {
            type: "input",
            name: "author",
            message: "Please enter the package.json author name: ",
          },
        ]);
        this.description = description;
        this.author = author;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description
     * 获取项目名称
     * @author wsy
     * @date 2020-12-04  22:54:55
     */
    getProjectName() {
      return this.projectName;
    },
    /**
     * @description
     * 抛错处理
     * @author wsy
     * @date 2020-12-04  22:55:09
     * @param {String} msg 提示文案
     */
    error(msg) {
      console.log("\r");
      console.log(logSymbols.error, chalk.red(`🍤  ${msg}`));
      make_empty();
    },
  },
});
