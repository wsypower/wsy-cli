// import { downloadLocal } from './utils/get';
const ora = require("ora");
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
var visualize = require("javascript-state-machine/lib/visualize");
const initStateMachineModel = require("./initStateMachine.js");

module.exports = (projectName) => {
  // 初始化init指令流程
  const initStateMachine = new initStateMachineModel(projectName);
  // 创建
  initStateMachine.init();
  //命令行交互
  // inquirer.prompt().then((answer) => {});
  // if (projectName == undefined) {
  //   // console.log(initStateMachine.state);
  //   initStateMachine.init("aaa");
  //   console.log("state======>", initStateMachine.state);
  // }
};
